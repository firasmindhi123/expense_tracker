const root_dir=require('../../util/path')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const model=require('../model/user')


function IsStringInvalid(str)
{
    if(str==undefined||str.length===0)
    {
        return true
    }
    else
    {
        return false
    }
}
function generateAccesstoken(id,ispremium){
    return jwt.sign({userid:id,ispremium},'securatewq')
  }
exports.signupfile=(req,res,next)=>{
    res.sendFile(path.join(root_dir,'views','index.html'))               
}
exports.signup=async(req,res,next)=>{
    try{
    const name=req.body.username
    const email=req.body.email
    const password=req.body.password
    if(IsStringInvalid(name)||IsStringInvalid(email)||IsStringInvalid(password))
    {
        return res.status(400).json({err:"something is missing"})
    }
    bcrypt.hash(password,10,async(err,hash)=>{
        console.log(err)
 await model.create({
        name,
        email,
        password:hash
    })
    res.status(201).json({message:"successs"})
    })
  
    
}catch(err){
res.status(500).json({error:err})
    }
    

}
exports.loginfile=(req,res,next)=>{
    res.sendFile(path.join(root_dir,'views','login.html'))
}
exports.login=async(req,res)=>{
    try{

    email=req.body.email
    password=req.body.password
    
    const a=await model.findAll({where:{email:`${email}`}})
    if(IsStringInvalid(email)||IsStringInvalid(password))
    {
        return res.status(400).json({success:false,message:"something is missing"})
    }
    if(a.length>0)
    {
        bcrypt.compare(password,a[0].password,(err,result)=>{
          if(err)
          {
            throw new Error('SOMETHING WENT WRONG')
          } 
          if(result==true)
          {
            console.log(a)
            

            res.status(200).json({success:true,message:"login successfull",token:generateAccesstoken(a[0].id,a[0].ispremium)})
        }
        else{
         res.status(402).json({success:false,message:"password is wrong"})
        }
        })
       
    }
    else{
        
        res.status(404).json({success:false,message:'email is wrong'})
       
    }
}catch(err){
    res.status(500).json({message:err})
}
}
