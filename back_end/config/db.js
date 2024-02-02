const mongoose = require('mongoose');
require('dotenv').config();
const db_connection_str = process.env.DB_CONNECTION_STRING;

// const dbURI = 'mongodb+srv://muawiyaasali:zAhILtuK7gf0kkPA@pollingappdb.iphhzly.mongodb.net/pollingAppDB?retryWrites=true&w=majority'
const dbURI = db_connection_str;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connect_to_mongodb = async () => {

    try {
        connectiont_status = await mongoose.connect(dbURI, clientOptions);
        if (connectiont_status){
            console.log('MongoDB Connected');
        }
    } catch (error) {
        console.log('error connecting to db' + error);
    }

};

module.exports = {
    connect_to_mongodb
};