const express = require('express')
const Todo = require('./model/Todo')
const Joi = require('joi')
const app = express()
require('./config/datababe')

app.use(express.json())  //global middleware have access to request, response and next

app.get('/todos',async(req,res,next)=>{
    try{
        let todos =await Todo.find()
        res.send({
        data:todos
         })
      }
    catch(err){
        next(err)
    } 
})


app.post('/todos',async(req,res,next)=>{
    try{
        const schema = Joi.object({
            title: Joi.string().required(),
            status:Joi.required()
        });
        let checkValidation = schema.validate(req.body,{abortEarly:false})
        if(checkValidation.error){
            return next(checkValidation)
        }
        console.log(checkValidation)
        console.log(checkValidation.name)
        console.log(checkValidation.details)
        
        let todo = await Todo.create({
        title:req.body.title,
        status:req.body.status
    })
    res.send(todo)
      }
    catch(err){
    next(err)
  } 
})

app.use((req,res)=>{
    res.status(404).send({
        msg:"bad request"
    })
})

app.use((err,req,res,next)=>{
    let statusCode = 500
    let msg = "Server Error"
    if(err.name === "ValidationError"){
        statusCode =400
        msg ="Bad Request"
    }
    res.status(statusCode).send({
        msg : msg
    })
})
  

app.listen(4000,()=>{
    console.log("server started at port 4000")
})