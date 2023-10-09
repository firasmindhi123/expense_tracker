import { Router } from "express";
const router=Router()
import { todos } from "../model/todos";
let todo:todos[]=[]
router.get('/',(req,res,next)=>{
    res.status(200).json({todo :todo})
})
router.post('/todo',(req,res,next)=>{
  const newtodo:todos={
  id:new Date().toISOString(),
  text:req.body.text
  }
  todo.push(newtodo)
  res.status(201).json({message:'created',todo:todo})
})
router.put('/todo/:todoId',(req,res,next)=>{
    const tid=req.params.todoId
    console.log(todo)
    const todoIndex=todo.findIndex((todoitem)=> todoitem.id===tid)
           console.log(tid,todoIndex)
        todo[todoIndex]={id:todo[todoIndex].id,text:req.body.text}
        return res.status(200).json({message:"updated",todo:todo})
    
    
})
router.delete('/todo/:todoId',(req,res,next)=>{
    todo=todo.filter((todoitem)=>{
        todoitem.id!==req.params.todoId
    })
    res.status(200).json({message:"deleted",todo:todo})
})
export default router