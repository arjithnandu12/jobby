const moongoose = require('mongoose');
const connectdb=async ()=>{
    try{
        const connect=await moongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected successfully",connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectdb;