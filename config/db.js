require('dotenv').config();
const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;

async function connectDB() {
    try {
        await mongoose.connect(URL);

        console.log('Database successfully connected...');
    } catch (error) {
        console.error('Connection failed due to:', error);
        process.exit(1); // Exit the process if DB connection fails
    }
}

module.exports = connectDB;
