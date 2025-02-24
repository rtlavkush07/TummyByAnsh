const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const jwtSecret = "MynameisTummyCravings1$#"

router.post("/creatuser", [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min: 5}),
    body('name').isLength({min: 4})]
,async (req , res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)


    try{
        User.create({
            name:req.body.name,
            password: secPassword,
            email:req.body.email,
            location: req.body.location
        })
        res.json({success:true});


    }catch(error){
        console.log(error)
        res.json({success:false});
    }
})


router.post("/loginuser", [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min: 5})
    ]
     ,async (req , res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }


    let email=req.body.email;
    let password = req.body.password;
    try{
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({ errors: "Try Login For Correct Credentials" });  
        }

        const comPassword = await bcrypt.compare(req.body.password,userData.password)

        if(!comPassword){
            return res.status(400).json({ errors: "Try Login For Correct Credentials" });  
        }
        const data = {
            user:{
                id: userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authToken });


    }catch(error){
        console.log(error)
        res.json({success:false});
    }
})

module.exports = router;