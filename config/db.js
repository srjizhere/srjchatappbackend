const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.mongouri);
        console.log(`MonogoDB Connected: ${connection.connection.host}` .america.bold);
    }catch(err){
        console.log(err);
        process.exit()
    }
};

module.exports = connectDB

