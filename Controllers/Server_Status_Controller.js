const express = require('express');
//Database 
const { createDbConnection } = require('../Models/common');

const Server_Status_Controller = {

    async server_Status (req, res) {
        try {
                const dbConnection = await createDbConnection();
                await dbConnection.execute('SELECT 1');
                // Example: Check a third-party service (e.g., an external API)
                const response = await fetch('https://google.com');
                if (!response.ok) {
                    res.status(400).json(false);                 
                    return ; 
                }
    
                // Check memory and CPU usage
                // const memoryUsage = process.memoryUsage();
                // if (memoryUsage.heapUsed / memoryUsage.heapTotal > 0.8) {
                //     throw new Error('Memory usage is too high');
                // }
    
                // Check disk space (example for Unix-like systems)
                // exec('df -h /', (error, stdout, stderr) => {
                //     if (error || stderr) {
                //         throw new Error('Disk space check failed');
                //     }
                //     const lines = stdout.trim().split('\n');
                //     const diskInfo = lines[1].split(/\s+/);
                //     const diskUsage = parseFloat(diskInfo[4]);
                //     if (diskUsage > 80) {
                //         throw new Error('Disk space usage is too high');
                //     }
                // });
                
            res.status(200).json(true);
        } catch (error) {
            res.status(400).json(false);
        }
        
                  
    }
};

module.exports = Server_Status_Controller;