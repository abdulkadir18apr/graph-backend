const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const loadDataSet=require('../loadDataSet');
const {authVerify}=require("../middleware/auth.verify.middleware")

router.get("/fetchData",authVerify,async(req,res)=>{
    try{
        const data=loadDataSet();
        return res.json({success:true,data})

    }catch(err){
        console.log(err)
        return res.status(404).json({success:false,error:err})
    }
})

module.exports=router