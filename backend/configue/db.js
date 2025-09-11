const mongoose = require('mongoose');
const dotenv = require('dotenv');

const contectDb = () => {
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(result => {
        console.log("db connected")
    })
    .catch(error=>{
        console.log(`error in db connection : ${error}`)
    })
}

module.exports = contectDb