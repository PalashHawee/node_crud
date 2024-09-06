const express = require('express')
const router = express.Router()
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userSchema = require('../schemas/userSchema')

//modelling
const User=new mongoose.model('User',userSchema)

//signup
router.post('/signup',async(req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const newUser=new User({
            name:req.body.name,
            username:req.body.username,
            password: hashedPassword //hash the password before saving it to the database
        })
        await newUser.save()
        res.status(201).send('User Created')
    }catch(err){
        res.status(400).send(err)
    }
})

//login
router.post('/login',async(req,res)=>{
    try {
        const { username, password } = req.body;
    
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            // Create a JWT token
            const token = jwt.sign(
                {
                    username: user.username,
                    userId: user.id,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
    
            // Send a success response with the token
            return res.status(200).json({
                access_token: token,
                message: 'Login Successful',
            });
        } else {
            // Send a 401 error if the password is invalid
            return res.status(401).json({ error: 'Invalid password' });
        }
    } catch (err) {
        // Handle any server errors
        return res.status(500).send('Authentication failed');
    }
    
})

//get all users
router.get('/',async(req,res)=>{
    try{
        const users=await User.find()
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }
})



module.exports= router