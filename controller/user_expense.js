const root_dir=require('../../util/path')
const path=require('path')
const sequelize=require('../../util/database')
const expense_model=require('../model/expense_model')
const model=require('../model/user')
const userService=require('../services/userservice')
const s3service=require('../services/s3services')
const file=require('../model/file_download')





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
exports.expensefile=(req,res)=>{
    res.sendFile(path.join(root_dir,'views','expense.html')) 
}
exports.expense=async(req,res)=>{
    const t = await sequelize.transaction();
    try{
        
  const expense=req.body.expense
  const description=req.body.description
  const category=req.body.category
  if(IsStringInvalid(expense)||IsStringInvalid(description)||IsStringInvalid(category))
    {
        return res.status(400).json({message:"something is missing"})
    }
  const datauser=await req.user.createExpense({

    expense,description,category,
   },{ transaction: t }
   )
   const totalamount=Number(req.user.totalExpese)+Number(datauser.expense)
 const data= await model.update({totalExpese:totalamount||0},{where:{id:req.user.id},transaction: t })
  await t.commit()
   res.status(200).json({userdata:datauser,success:true,data})

    }catch(err){
        await t.rollback()
        res.status(500).json({success:false,err})
    }
}
exports.getexpense=async(req,res,next)=>{
    try{
        console.log(req.query)
       
      const page = +req.query.page||1
      const pagesize =+req.query.limit||10
      let totalitem
      data1=await expense_model.count()
      totalitem=data1;
   data=  await expense_model.findAll({
        offset:(page-1)*pagesize,
        limit:pagesize
      })
  res.status(200).json({
    products:data,
    currentpage:page,
    hasnextpage:pagesize*page<totalitem,
    nextpage:page+1,
    haspreviouspage:page>1,
    previouspage:page-1,
    lastpage:Math.ceil(totalitem/pagesize)
})
}catch(err){
    res.status(402).json({error:err})
}
}
exports.deleteExpense=async(req,res)=>{
    const t = await sequelize.transaction();
    try{
      const uid = req.params.id
      if(IsStringInvalid(uid))
    {
        return res.status(400).json({success:false,message:"something is missing"})
    }
        const row=await expense_model.findByPk(uid,{transaction: t })
        if(row==0)
        {
            res.status(405).json({success:false,message:'doesnt belong to user'})
        }
            
        const totalamount=Number(req.user.totalExpese)-Number(row.expense)
        await expense_model.destroy({where:{id:uid,asadId:req.user.id},transaction: t })
          await model.update({totalExpese:totalamount},{where:{id:req.user.id},transaction: t  })
        
       await t.commit()
        res.sendStatus(200)
    }catch(err){
        
        await t.rollback()
        res.status(505).json({success:false,message:'somethoing went wrong'})
    }
    }
    exports.download=async(req,res)=>{
        try{
          if(!req.user.ispremium){
            return res.status(404).json({message:"you are not a premium user",success:false})
          }
        const expenses=await userService.getExpenses(req)
        console.log(expenses)
        const stringfiedexpense=JSON.stringify(expenses)
        let userId=req.user.id
        
        const filename=`expense/${userId}/${new Date()}.txt`
        const fileurl=await s3service.uplodtoS3(stringfiedexpense,filename)
        console.log(fileurl)
        await  req.user.createFile({path:fileurl})
        res.status(200).json({fileurl,success:true})    
        
        
       }catch(err){
        res.status(501).json({success:false,err})
       }}
       exports.download_file=async(req,res)=>{
        try{
      
        const data=await req.user.getFiles()
        res.status(200).json({downloadfile:data})
      }catch(err){
        console.log(err)
        res.status(402).json({error:err})
      }
      }