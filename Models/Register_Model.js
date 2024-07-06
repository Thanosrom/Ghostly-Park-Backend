const { createDbConnection } = require('./common');


async function check_If_Email_Exist_Model(email) {

    const dbConnection = await createDbConnection();
    try {
        const [results] = await dbConnection.execute('SELECT * from register where email = ?', [email]);
        return results;
    }catch(error){   
        return false;
    }finally {
        dbConnection.close();
    }
        
}

async function register_Data_Model(username, password, email, carInfo, coins, gems,subscription) {

    const dbConnection = await createDbConnection();
 
    try{
        const [results] = await dbConnection.execute('INSERT INTO register (username, password, email, carInfo, coins, gems, subscription) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, password, email, carInfo, coins, gems, subscription]);
        return results.affectedRows === 1;
    }catch(error){
        return false;
    }    
    finally {
        dbConnection.close();
    }       
}

module.exports = {
    register_Data_Model,
    check_If_Email_Exist_Model,
};
