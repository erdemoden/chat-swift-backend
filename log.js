const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("./User");
const multer = require("multer");

const upload = multer({
    limits: {
        fileSize: 1000000,
        },
    fileFilter(req,file,callback){
        callback(undefined,true);
    }
}).single('avatar');

router.post("/sign-up",async(req,res)=>{
            let user = new Users({
                username:req.body.username,
                password:req.body.password
            });
            try{
                const post = await user.save();
                res.json({"success":true});
            }
            catch(e){
                if(e.code!=11000){
                    let error1 = e.message.substring(e.message.indexOf(':')+1);
                    res.json({"error":error1});
                }
            }
        });
router.get("/image",async(req,res)=>{
      let get = await Users.find({});
    res.set('Content-Type','image/jpg');
    res.send(get[1].avatar);
});
router.post("/login",async(req,res)=>{
let user = await Users.findOne({username:req.body.name});

});

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