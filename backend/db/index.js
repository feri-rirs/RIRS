const mongoose = require('mongoose');

const { dbUrl } = require('../config/index');

const connectToDatabase = async () => {
    try {
        database = await mongoose.connect(dbUrl);
        if (database) {
            console.log("Connected to Database!")
        }
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    connectToDatabase
}
