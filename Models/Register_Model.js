/* eslint-disable no-unused-vars */
const { createDbConnection } = require('./common');

async function check_If_Email_Exist_Model(email) {
  const dbConnection = await createDbConnection();
  try {
    const [results] = await dbConnection.execute(
      'SELECT * from register where email = ?',
      [email]
    );
    return results;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function register_Data_Model(
  username,
  password,
  email,
  carInfo,
  coins,
  gems,
  subscription,
  sub
) {
  const dbConnection = await createDbConnection();
  try {
    let sql;
    let params;

    if (sub !== undefined && sub !== null) {
      sql =
        'INSERT INTO register (username, password, email, carInfo, coins, gems, subscription, google_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      params = [
        username,
        password,
        email,
        carInfo,
        coins,
        gems,
        subscription,
        sub,
      ];
    } else {
      sql =
        'INSERT INTO register (username, password, email, carInfo, coins, gems, subscription) VALUES (?, ?, ?, ?, ?, ?, ?)';
      params = [username, password, email, carInfo, coins, gems, subscription];
    }
    const [results] = await dbConnection.execute(sql, params);
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

module.exports = {
  register_Data_Model,
  check_If_Email_Exist_Model,
};
