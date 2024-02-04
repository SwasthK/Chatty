const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectmongo = async () => {
    try {
        const URL = process.env.MONGO_DB_URI
        await mongoose.connect(URL)
        console.log("Connected MongoDB");

    } catch (error) {
        console.log("Error occurred !", error);
    }
}

module.exports = connectmongo
