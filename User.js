const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Users = new schema({
        username:{
            type:String,
            unique:true,
            required:[true,"Name Field Is Required"],
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
module.exports = mongoose.model("Users",Users);

