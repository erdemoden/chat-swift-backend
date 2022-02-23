const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("./User");
const multer = require("multer");
const jwt = require('jsonwebtoken');
const resolve = require('path').resolve;
require("dotenv").config();
const upload = multer({
    limits: {
        fileSize: 1000000000,
        },
    fileFilter(req,file,callback){
        callback(undefined,true);
    }
}).single('avatar');


// SIGN-UP
router.post("/sign-up",async(req,res)=>{
            let user = new Users({
                username:req.body.username,
                password:req.body.password
            });
            try{
                const post = await user.save();
                let token = jwt.sign({username: req.body.username},process.env.secret)
                res.json([{"sessionid":String(token),"error":"null","name":req.body.username}]);
                console.log("Gönderildi");
            }
            catch(e){
                if(e.code!=11000){
                    let error1 = e.message.substring(e.message.indexOf(':')+1);
                    res.json([{"sessionid":"null","error":error1,"name":"null"}]);
                }
                else{
                    res.json([{"sessionid":"null","error":"This Name Is Already Exist","name":"null"}]);
                }
            }
        });

// GET IMAGE
router.get("/image/:user",async(req,res)=>{
    let get = await Users.find({username:req.params.user});
    if(get[0].avatar){
    res.set('Content-Type','image/jpg');
    res.send(get[0].avatar);
    }
    else{
    res.set('Content-Type','image/jpg');
    res.sendFile(__dirname+'/images/profile-pic.png');
    //console.log(resolve('./images/profile-pic.png'))
    }
});

// LOGIN
router.post("/login",async(req,res)=>{
let user = await Users.findOne({username:req.body.username});
if(!user){
    res.json([{"sessionid":"null","error":"We Could Not Find The User You Typed","name":"null"}]);
}
    else{
        const ischeck = await bcrypt.compare(req.body.password,user.password);
        if(!ischeck){
            res.json([{"sessionid":"null","error":"Your Password Is Wrong","name":"null"}]);
        }
        else{
            let token = jwt.sign({username: req.body.username},process.env.secret)
            res.json([{"sessionid":String(token),"error":"null","name":req.body.username}]);
        }
    }
});

// UPLOAD IMAGE
router.post("/upload-image/:user",async(req,res)=>{
    console.log("merhaba");
upload(req,res,async(err)=>{
    if(err){
        console.log("error"+" "+err);
    }
    else{
        console.log(req.file);
        myavatar = Buffer.from(req.file.buffer,'base64');
        try{
           // let find = await Users.findByIdAndUpdate(req.body.name,{avatar:myavatar})
            let find = await Users.findOneAndUpdate({username:req.params.user},{avatar:myavatar});
            res.json([{"error":"nil"}]);
        }
        catch(e){
            if(e.code!=11000){
                let error1 = e.message.substring(e.message.indexOf(':')+1);
                res.json([{"error":error1}]);
            }
            else{
                res.json([{"error":"hata"}]);
            }
        }
    }
})


});






module.exports = router;