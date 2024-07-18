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
  console.log(sub);

  try {
    let sql;
    let params;
    console.log(
      username,
      password,
      email,
      carInfo,
      coins,
      gems,
      subscription,
      sub
    );
    if (sub !== undefined && sub !== null) {
      console.log(111111111111);
      sql =
        'INSERT INTO register (username, password, email, carInfo, coins, gems, subscription, sub) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
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
      console.log(22222222222);
      sql =
        'INSERT INTO register (username, password, email, carInfo, coins, gems, subscription) VALUES (?, ?, ?, ?, ?, ?, ?)';
      params = [username, password, email, carInfo, coins, gems, subscription];
    }
    console.log('SQL:', sql);
    console.log('Params:', params);
    const [results] = await dbConnection.execute(sql, params);
    console.log('Results:', results);
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
