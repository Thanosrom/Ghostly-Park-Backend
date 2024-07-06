const { createDbConnection } = require('./common');

async function login_Model(email) {
    const dbConnection = await createDbConnection();

    try {
        const [results] = await dbConnection.execute('SELECT id,username,password,email,carInfo,coins,gems FROM register WHERE email = ?', [email]);
        return results;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

module.exports = {
    login_Model,
};
