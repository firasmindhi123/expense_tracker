const jwt=require('jsonwebtoken')
const User=require('./model/user')

exports.authenticate=(req,res,next)=>{
    try{
       const token=req.header('Authorization')
       console.log(token)
       const user=jwt.verify(token,'securatewq')
       console.log(user)
       User.findByPk(user.userid).then(user=>{
        req.user=user
        next()
       })
    }
    catch(err)
    {
        console.log(err)
        return res.status(402).json({success:false})
    }
}