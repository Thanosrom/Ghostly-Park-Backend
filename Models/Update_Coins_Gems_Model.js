const { createDbConnection } = require('./common');

async function plus_Coins(id) {
    const dbConnection = await createDbConnection();
    try {
        const [currentResults] = await dbConnection.execute('SELECT coins FROM register WHERE id = ?', [parseInt(id)]);
        const currentCoins = currentResults[0].coins;
        const updatedCoins = currentCoins + 1;
        const [results] = await dbConnection.execute('UPDATE register SET coins = ? WHERE id = ?', [updatedCoins,parseInt(id)]);      
        return results.affectedRows === 1;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

async function minus_Coins(id) {
    const dbConnection = await createDbConnection();

    try {
        const [currentResults] = await dbConnection.execute('SELECT coins FROM register WHERE id = ?', [parseInt(id)]);
        const currentCoins = currentResults[0].coins;
        if(currentCoins > 0 ){
            const updatedCoins = currentCoins - 1;
            const [results] = await dbConnection.execute('UPDATE register SET coins = ? WHERE id = ?', [updatedCoins,parseInt(id)]);    
            return results.affectedRows === 1;
        }else{
            return false;
        }
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

async function minus_5_Coins(id) {
    const dbConnection = await createDbConnection();

    try {
        const [currentResults] = await dbConnection.execute('SELECT coins FROM register WHERE id = ?', [parseInt(id)]);
        const currentCoins = currentResults[0].coins;
        const updatedCoins = currentCoins - 5;
        const [results] = await dbConnection.execute('UPDATE register SET coins = ? WHERE id = ?', [updatedCoins,parseInt(id)]);    
        return results.affectedRows === 1;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

async function plus_Gems(id) {
    const dbConnection = await createDbConnection();

    try {
        const [currentResults] = await dbConnection.execute('SELECT gems FROM register WHERE id = ?', [parseInt(id)]);
        const currentGems = currentResults[0].gems;
        const updatedGems = currentGems + 1;
        const [results] = await dbConnection.execute('UPDATE register SET gems = ? WHERE id = ?', [updatedGems,parseInt(id)]);       
        return results.affectedRows === 1;
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

async function minus_Gems(id) {
    const dbConnection = await createDbConnection();

    try {
        const [currentResults] = await dbConnection.execute('SELECT gems FROM register WHERE id = ?', [parseInt(id)]);
        const currentGems = currentResults[0].gems;
        const updatedGems = currentGems - 1;
        if(updatedGems > 0 ){
            const [results] = await dbConnection.execute('UPDATE register SET gems = ? WHERE id = ?', [updatedGems,parseInt(id)]);   
            return results.affectedRows === 1;
        }else{
            return false;
        }
    }catch(error){
        return false;
    }finally {
        dbConnection.close();
    }
}

module.exports = {
    plus_Coins,
    minus_Coins,
    minus_5_Coins,
    plus_Gems,
    minus_Gems,
};
