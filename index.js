const express = require('express')
const Todo = require('./model/Todo')
const app = express()
require('./config/datababe')

app.use(express.json())  //global middleware have access to request, response and next

app.get('/todos',async(req,res)=>{
    let todos =await Todo.find()
    res.send({
        data:todos
    })
})

app.post('/todos',async(req,res)=>{
    let todo = await Todo.create({
        title:req.body.title,
        status:req.body.status
    })
    res.send(todo)
})

app.listen(4000,()=>{
    console.log("server started at port 4000")
})