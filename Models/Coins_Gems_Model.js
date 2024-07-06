const { createDbConnection } = require('./common');


async function get_Subscription(id) {
    const dbConnection = await createDbConnection();
    
    try {
        const [results] = await dbConnection.execute('SELECT subscription FROM register WHERE id = ?', [parseInt(id)]);       
        return results;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

async function get_Coins(id) {
    const dbConnection = await createDbConnection();

    try {
        const [results] = await dbConnection.execute('SELECT coins FROM register WHERE id = ?', [parseInt(id)]);       
        return results;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

async function get_Gems(id) {
    const dbConnection = await createDbConnection();

    try {
        const [results] = await dbConnection.execute('SELECT gems FROM register WHERE id = ?', [parseInt(id)]);       
        return results;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

module.exports = {
    get_Subscription,
    get_Coins,
    get_Gems,
};
