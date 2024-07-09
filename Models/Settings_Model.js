/* eslint-disable no-unused-vars */
const { createDbConnection } = require('./common');

async function change_Username(newUsername, id) {
  const dbConnection = await createDbConnection();

  try {
    const [results] = await dbConnection.execute(
      'UPDATE register SET username = ? WHERE id = ?',
      [newUsername, parseInt(id)]
    );
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}
async function check_Old_Password(id) {
  const dbConnection = await createDbConnection();
  try {
    const [results] = await dbConnection.execute(
      'SELECT password FROM register WHERE id = ?',
      [parseInt(id)]
    );
    return results;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}
async function change_Password(hash, id) {
  const dbConnection = await createDbConnection();

  try {
    const [results] = await dbConnection.execute(
      'UPDATE register SET password = ? WHERE id = ?',
      [hash, parseInt(id)]
    );
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function change_CarInfo(newCarInfo, id) {
  const dbConnection = await createDbConnection();

  try {
    const [results] = await dbConnection.execute(
      'UPDATE register SET carInfo = ? WHERE id = ?',
      [newCarInfo, parseInt(id)]
    );
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function delete_User(id) {
  const dbConnection = await createDbConnection();
  try {
    const [results] = await dbConnection.execute(
      'DELETE FROM register WHERE id = ?',
      [parseInt(id)]
    );
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

module.exports = {
  change_Username,
  check_Old_Password,
  change_Password,
  change_CarInfo,
  delete_User,
};
