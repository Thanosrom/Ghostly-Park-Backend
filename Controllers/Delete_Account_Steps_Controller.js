const express = require('express');

const Delete_Account_Steps_Controller = {
    async delete_Account_Steps(req, res) {
        try {
            // Serve the HTML content directly
            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Delete Account</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        background-color: #f9f9f9;
                    }
                    .container {
                        width: 80%;
                        margin: auto;
                        overflow: hidden;
                        padding: 20px;
                        background: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        margin: 10px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Delete Account</h1>
                    <p>To delete your account and all associated data from our app, please follow the steps below:</p>
                    <ol>
                        <li>Open the app.</li>
                        <li>Go to "Settings".</li>
                        <li>Select "Delete Account".</li>
                        <li>Confirm your decision.</li>
                    </ol>
                    <p>Once the process is completed, all your data will be permanently removed from our system.</p>
                    <p>If you have any questions or need assistance, please contact our customer support at <a href="mailto:support@ghostlypark.com">support@ghostlypark.com</a>.</p>
                    <p>Our team will assist you with any issues you encounter during the account deletion process.</p>
                </div>
            </body>
            </html>
            `;
            res.status(200).send(htmlContent);
        } catch (error) {
            res.status(400).json({ message: 'Server is facing issues' });
        }
    }
};

module.exports = Delete_Account_Steps_Controller;
