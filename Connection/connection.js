const mongoose = require('mongoose');

let db; // Declare db variable

async function connectMongoDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Travel");
        console.log("MongoDB connected!! ");
        db = mongoose.connection.db; // Access db object from mongoose connection
        return db; // Return db object
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { connectMongoDB, db }; // Export connectMongoDB function and db object
