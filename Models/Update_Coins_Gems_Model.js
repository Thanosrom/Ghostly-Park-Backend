/* eslint-disable no-unused-vars */
const { createDbConnection } = require('./common');

async function plus_Subscription(id) {

  const dbConnection = await createDbConnection();
  try {

    const updatedSubscription = 1;
    const timestamp = new Date();
    const [results] = await dbConnection.execute(
      'UPDATE register SET subscription = ?,subscription_timestamp = ? WHERE id = ?',
      [updatedSubscription, timestamp, parseInt(id)]
    );
    return results.affectedRows === 1;
  
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function minus_Subscription() {

  const dbConnection = await createDbConnection();
  try {
    const [results] = await dbConnection.execute(
      'UPDATE register SET subscription = ? WHERE subscription = ? AND subscription_timestamp < NOW() - INTERVAL 30 DAY',
      [0, 1]
    );
    console.log(results)
    return results.affectedRows > 0;
  } catch (error) {
    console.error('Error updating subscription:', error);  // Log the error for debugging
  } finally {
    dbConnection.close();
  }
}

async function plus_Coins(id,type) {
  const dbConnection = await createDbConnection();
  try {
    const [currentResults] = await dbConnection.execute(
      'SELECT coins FROM register WHERE id = ?',
      [parseInt(id)]
    );
    if(type == 'ads'){
    const currentCoins = currentResults[0].coins;
    const updatedCoins = currentCoins + 3;
    const [results] = await dbConnection.execute(
      'UPDATE register SET coins = ? WHERE id = ?',
      [updatedCoins, parseInt(id)]
    );
    return results.affectedRows === 1;
    }else if (type == 'reward'){
      const currentCoins = currentResults[0].coins;
      const updatedCoins = currentCoins + 3;
      const [results] = await dbConnection.execute(
        'UPDATE register SET coins = ? WHERE id = ?',
        [updatedCoins, parseInt(id)]
      );
      return results.affectedRows === 1;
    }else if (type == 'buy'){
      const currentCoins = currentResults[0].coins;
      const updatedCoins = currentCoins + 30;
      const [results] = await dbConnection.execute(
        'UPDATE register SET coins = ? WHERE id = ?',
        [updatedCoins, parseInt(id)]
      );
      return results.affectedRows === 1;
      }

  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function minus_Coins(id,type) {
  const dbConnection = await createDbConnection();

  try {
    const [currentResults] = await dbConnection.execute(
      'SELECT coins FROM register WHERE id = ?',
      [parseInt(id)]
    );
    const currentCoins = currentResults[0].coins;
    if(type == 'simple'){
    if (currentCoins > 0) {
      const updatedCoins = currentCoins - 1;
      const [results] = await dbConnection.execute(
        'UPDATE register SET coins = ? WHERE id = ?',
        [updatedCoins, parseInt(id)]
      );
      return results.affectedRows === 1;
    }
    }else if(type == 'police'){
      const updatedCoins = currentCoins - 10;
      const [results] = await dbConnection.execute(
        'UPDATE register SET coins = ? WHERE id = ?',
        [updatedCoins, parseInt(id)]
      );
      return results.affectedRows === 1;
    }
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function plus_Gems(id) {
  const dbConnection = await createDbConnection();

  try {
    const [currentResults] = await dbConnection.execute(
      'SELECT gems FROM register WHERE id = ?',
      [parseInt(id)]
    );
    const currentGems = currentResults[0].gems;
    const updatedGems = currentGems + 30;
    const [results] = await dbConnection.execute(
      'UPDATE register SET gems = ? WHERE id = ?',
      [updatedGems, parseInt(id)]
    );
    return results.affectedRows === 1;
  } catch (error) {
    return false;
  } finally {
    dbConnection.close();
  }
}

async function minus_Gems(id) {
  const dbConnection = await createDbConnection();

  try {
    const [currentResults] = await dbConnection.execute(
      'SELECT gems FROM register WHERE id = ?',
      [parseInt(id)]
    );
    const currentGems = currentResults[0].gems;
    const updatedGems = currentGems - 1;
    if (updatedGems > 0) {
      const [results] = await dbConnection.execute(
        'UPDATE register SET gems = ? WHERE id = ?',
        [updatedGems, parseInt(id)]
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
  plus_Subscription,
  minus_Subscription,
  plus_Coins,
  minus_Coins,
  plus_Gems,
  minus_Gems,
};
