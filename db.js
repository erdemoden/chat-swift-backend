const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://erdemoden:elmayiyen5@movie-api.icdyd.mongodb.net/Chat-Swift?retryWrites=true&w=majority");
module.exports = ()=>{
    mongoose.connection.on("open",()=>{
        console.log("Bağlandık");
    });
    mongoose.connection.on('error',()=>{
        console.log("Bir Hatayla Karşılaştık");
    });

    mongoose.Promise = global.Promise
}