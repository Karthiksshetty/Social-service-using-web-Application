const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(process.env.mongoURL, {
    // dbName: "SOCIAL_SERVICE"
});

module.exports = connection;