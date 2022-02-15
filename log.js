const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("./User");
const multer = require("multer");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const upload = multer({
    limits: {
        fileSize: 1000000,
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
                res.json({"sessionid":String(token),"error":"null"});
                console.log("Gönderildi");
            }
            catch(e){
                if(e.code!=11000){
                    let error1 = e.message.substring(e.message.indexOf(':')+1);
                    res.json({"sessionid":"null","error":error1});
                }
                else{
                    res.json({"sessionid":"null","error":"This Name Is Already Exist"});
                }
            }
        });

// GET IMAGE
router.get("/image",async(req,res)=>{
      let get = await Users.find({});
    res.set('Content-Type','image/jpg');
    res.send(get[1].avatar);
});

// LOGIN
router.post("/login",async(req,res)=>{
let user = await Users.findOne({username:req.body.name});
if(!user){
    res.json({"error":"We Could Not Find The User You Typed","sessionid":"nul"});
}
    else{
        const ischeck = await bcyrpt.compare(req.body.password,user1.password);
        if(!ischeck){
            res.json({"error":"Your Password Is Wrong","sessionid":"null"});
        }
        else{
            let token = jwt.sign({username: req.body.username},process.env.secret)
            res.json({"sessionid":token,"error":"null"});
        }
    }
});

// UPLOAD IMAGE
router.post("/upload-image",async(req,res)=>{
upload(req,res,async(err)=>{
    if(err){
        console.log("error");
    }
    else{
        myavatar = Buffer.from(req.file.buffer,'base64');
        try{
            let find = await Users.findByIdAndUpdate(req.body.id,{avatar:myavatar})
            res.json({"success":true});
        }
        catch(e){
            if(e.code!=11000){
                let error1 = e.message.substring(e.message.indexOf(':')+1);
                res.json({"error":error1});
            }
            else{
                res.json({"error":"hata"});
            }
        }
    }
})


});






module.exports = router;