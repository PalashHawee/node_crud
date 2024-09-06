const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// routes
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();

dotenv.config();
app.use(express.json());

// connect to MongoDB
mongoose.connect('mongodb://localhost/todos')
.then(() => {console.log('connected to db')})
.catch(err=>{console.log(err)})

// application routes
app.use('/todo',todoHandler)
app.use('/users',userHandler)

// default error handler
const  errorHandler=(err,req,res,next)=> {
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({message:err.message})
}

app.use(errorHandler)  // must be the last middleware to be defined

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})