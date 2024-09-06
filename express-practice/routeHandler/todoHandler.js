const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoSchema = require('../schemas/todoSchema')
const checkLogin = require('../middlewares/checkLogin')

//modelling
const Todo=new mongoose.model('Todo',todoSchema)

//get all todos
router.get('/', checkLogin,async(req,res)=>{
    try{
        const findTodos=await Todo.find({'status':'active'}).select({
            _id:0,
            _v:0
        })
        res.status(200).json({result:findTodos})
    }catch(err){
        res.status(400).json({
            error: 'Error fetching todos', // Generic error message
            details: err.message // Include details of the error
        });
    }
})

//get a single todo
router.get('/:id',async(req,res)=>{
    try{
        const findTodo=await Todo.find({'status':'active'})
        res.status(200).json({result:findTodo})
    }catch(err){
        res.status(404).json({
            error: 'Todo not found', // Generic error message
            details: err.message // Include details of the error
        });
    }
});

//post a todos
router.post('/',async(req,res)=>{
   
    try {
        const newTodo = new Todo(req.body); // Create a new Todo instance with the request body
        const savedTodo = await newTodo.save(); // Save the new Todo to the database
        res.status(201).json({
            message: 'Todo saved successfully',
            todo: savedTodo // Include the saved todo in the response
        });
    } catch (err) {
        res.status(400).json({
            error: 'Error saving todo', // Generic error message
            details: err.message // Include details of the error
        });
    }

});

//post multiple todos
router.post('/all',async(req,res)=>{
    try{
        const todos= await Todo.insertMany(req.body)
    
        res.status(200).json({
            message: 'Todos saved successfully',
            details: todos // Include the saved todos in the response
        })
        res.status(200).json({
            message: 'Todos saved successfully',
            todos: savedTodo // Include the saved todos in the response
        })
    }catch (err) {
        res.status(400).json({
            error: 'Error saving todos', // Generic error message
            details: err.message // Include details of the error
        });
    }
});

//put a todos
router.put('/:id',async(req,res)=>{
    try{
        const updateId=await Todo.findByIdAndUpdate({_id:req.params.id},{
            $set:{description:'Dhaka'}
           
        });
        res.status(200).json({
            message: 'Todo updated successfully',
            details: updateId // Include the updated todo in the response
        });
    }catch(err){
        res.status(400).json({
            error: 'Error updating todo', // Generic error message
            details: err.message // Include details of the error
        });
    }
});

//get todo active using custom instance method
 router.get('/active',async (req, res)=>{
     try{
        const todo=new Todo()
        const data= await todo.findActive();
        res.status(200).json({
            message: 'Active todos',
            details: data // Include the active todos in the response
        });

     }catch(err){
        res.status(400).json({
            error: 'Error fetching active todos', // Generic error message
            details: err.message // Include details of the error
        });
     }
 })
 
 // static methods
router.get('/js',async(req, res)=>{
    try{
        const data=await Todo.findByJs()
        res.status(200).json({
            message: 'Todos by JS',
            details: data // Include the active todos in the response
        });
    }catch(err){
        res.status(400).json({
            error: 'Error fetching todos by JS', // Generic error message
            details: err.message // Include details of the error
        });
    }
})

//get todos by language
router.get('/language', async(req,res) => {
    try{
        const data=await Todo.byLanguage('python');
        res.status(200).json({
            message: 'Todos by language',
            details: data // Include the active todos in the response
        });
    }catch(err){
        res.status(400).json({
            error: 'Error fetching todos by language', // Generic error message
            details: err.message // Include details of the error
        });
    }
})

//delete todos
router.delete('/:id',async(req,res)=>{
    try{
        const deletTodos = await Todo.deleteOne({id:req.params.id});
        res.status(200).json({
            message: 'Todo deleted successfully',
            details: deletTodos // Include the deleted todo in the response
        });
    }catch(err){
        res.status(400).json({
            error: 'Error deleting todo', // Generic error message
            details: err.message // Include details of the error
        });
    }
})

module.exports=router;
