const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;


async function signup(firstName,lastName,email,password){
    try{
        const user= await User.create({firstName,lastName,email,password});
        await user.save();
        return user
    }
    catch(err){
        throw err
    }
    
}

router.post("/signup",async(req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body;
        const user=await signup(firstName,lastName,email,password);
        const token=jwt.sign({userId:user._id},JWT_SECRET)
        return res.json({user,token,success:true})
    }
    catch(err){
        console.log(err)
        return res.status(401).json({error:err,msg:"Signup failed"})
    }
})


async function login(email,password){
    try{

        const user=await User.findOne({email});
        console.log(user)
        if(user && user.password===password){
            
            return user;
        }
        else{
            throw new Error("Invalid credentials")
        }
    }
    catch(err){
        throw err
    }
}


router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await login(email,password);
        const token=jwt.sign({userId:user._id},JWT_SECRET)
        return res.json({user,token,success:true})
    }
    catch(err){
        console.log(err)
        return res.status(401).json({error:err,msg:"login failed"})
    }
})

module.exports=router