const mongoose = require("mongoose")
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 1003

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    } 
    catch (err) {
        console.error("*****error connection to DB****\n" + err)
        }
    }

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err)
    })
module.exports = connectDB

