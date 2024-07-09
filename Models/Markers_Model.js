/* eslint-disable no-unused-vars */
const { createDbConnection } = require('./common');
const moment = require('moment');

async function get_FilteredMarkers_Model(lat, lng) {
  const dbConnection = await createDbConnection();

  try {
    const [results] = await dbConnection.execute(
      'SELECT unParked_latitude, unParked_longitude, unParked_time ' +
        'FROM unparked_slots ' +
        'WHERE ST_Distance_Sphere(POINT(unParked_longitude,unParked_latitude), POINT(?,?)) <= ?',
      [lng, lat, 5 * 1000]
    );

    return results;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function send_UnParked_Location_Model(user, lat, lng) {
  const dbConnection = await createDbConnection();
  const timestamp = Date.now();

  try {
    const [results] = await dbConnection.execute(
      'INSERT INTO unparked_slots (user, unParked_latitude, unParked_longitude, unParked_time) VALUES (?, ?, ?, ?)',
      [user, lat, lng, timestamp]
    );
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function send_Parked_Location_Model(user, parked_long, parked_lat) {
  const dbConnection = await createDbConnection();
  const parked_time = Date.now();
  try {
    await dbConnection.execute('DELETE FROM parked_slots WHERE user = ?', [
      user,
    ]);
    const [results] = await dbConnection.execute(
      'INSERT INTO parked_slots (user, parked_longitude, parked_latitude, parked_time) VALUES (?, ?, ?, ?)',
      [user, parked_long, parked_lat, parked_time]
    );

    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function get_Parked_Location_Model(user) {
  const dbConnection = await createDbConnection();

  try {
    const [results] = await dbConnection.execute(
      'SELECT * FROM parked_slots WHERE user = ?',
      [user]
    );
    return results;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

//-----------------------------------------------For the Server to do----------------------------------------------------------------------------//
async function delete_Markers_Model() {
  const dbConnection = await createDbConnection();

  try {
    const [rows] = await dbConnection.execute(
      'SELECT unParked_time FROM unparked_slots'
    );

    const hours_Ago = moment().subtract(12, 'hours'); // 12 hour ago

    //Do it as a timestamp
    const markersToDelete = rows.filter((marker) =>
      moment.unix(marker.unParked_time / 1000).isBefore(hours_Ago)
    );

    // Delete the old markers from the database
    for (const marker of markersToDelete) {
      await dbConnection.query(
        'DELETE FROM unparked_slots WHERE unParked_time = ?',
        [marker.unParked_time]
      );
    }
    console.log('Markers Deleted');
  } catch (error) {
    console.log(error);
  } finally {
    dbConnection.close();
  }
}

module.exports = {
  get_FilteredMarkers_Model,
  send_UnParked_Location_Model,
  get_Parked_Location_Model,
  send_Parked_Location_Model,
  delete_Markers_Model,
};
