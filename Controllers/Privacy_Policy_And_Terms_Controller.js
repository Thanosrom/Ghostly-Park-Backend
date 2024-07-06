const express = require('express');
const fs = require('fs');
const path = require('path');

const Privacy_Policy_And_Terms_Controller = {
    async privacy_Policy_And_Terms(req, res) {
        try {
            // Read the HTML file containing the privacy policy
            const privacyPolicyPath = path.join(__dirname, '../assets/privacy_policy_and_terms.html');
            const privacyPolicyHTML = fs.readFileSync(privacyPolicyPath, 'utf8');

            // Send the HTML response
            res.status(200).send(privacyPolicyHTML);
        } catch (error) {
            res.status(400).json({ message: 'Server is facing issues' });
        }
    }
};

module.exports = Privacy_Policy_And_Terms_Controller;