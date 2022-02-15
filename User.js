const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Users = new schema({
        username:{
            type:String,
            unique:true,
            required:[true,"Username Field Is Required"],
            maxlength:[15,"You Can Not Enter A Name More Than 15 Character"]
        },
        password:{
            type:String,
            required:[true,"Password Field Is Required"],
        },
        avatar:{
            type:Buffer,
        }
});
Users.pre('save',async function (next){
    user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next();
});
module.exports = mongoose.model("Users",Users);

