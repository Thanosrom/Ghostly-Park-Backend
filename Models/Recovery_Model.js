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

async function change_Password(password, email) {
  const dbConnection = await createDbConnection();

  try {
    const [results_id] = await dbConnection.execute(
      'SELECT id FROM register WHERE email = ?',
      [email]
    );
    if (results_id.length > 0) {
      const userId = results_id[0].id;
      const [results] = await dbConnection.execute(
        'UPDATE register SET password = ? WHERE id = ?',
        [password, userId]
      );
      console.log(results)
      return results.affectedRows === 1;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

module.exports = {
  check_If_Email_Exist_Model,
  change_Password,
};
