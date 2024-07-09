/* eslint-disable no-unused-vars */
const { createDbConnection } = require('./common');

async function change_Password(password, repeatPassword, email) {
  const dbConnection = await createDbConnection();

  try {
    const [results_id] = await dbConnection.execute(
      'SELECT id FROM register WHERE email = ?',
      [email]
    );
    if (results_id.length > 0) {
      const userId = results_id[0].id;
      const [results] = await dbConnection.execute(
        'UPDATE register SET password = ?, repeatPassword = ? WHERE id = ?',
        [password, repeatPassword, userId]
      );
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
  change_Password,
};
