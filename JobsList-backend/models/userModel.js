const moongoose = require('mongoose');
const userSchema = new moongoose.Schema({
    username:{type:String,required:[true,"Please enter your username"]},
    email:{type:String,required:[true,"Please enter your email"],unique:true},
    password:{type:String,required:[true,"Please enter your password"]},
},{
    timestamps:true 
});
module.exports = moongoose.model("User",userSchema);