const express = require('express')
const adminRouter=express.Router()

adminRouter.get('/',(req,res)=>{
    res.send('Admin Page')
})

adminRouter.get('/users',(req,res)=>{
    res.send('User List')
})

module.exports=adminRouter