
const express = require('express');
const bodyparse=require('body-parser')
const fs=require('fs')
const path=require('path')
const dotenv = require('dotenv');

dotenv.config();
const sequelize=require('./util/database')
const user=require('./model/user')
const payment=require('./router/payment')
const expense=require('./model/expense_model')
const Order=require('./model/order_model')
const Forgotpassword=require('./model/model_reset')
const file_download=require('./model/file_download')

const morgan= require('morgan')

const asad=require('./router/user')
const leader=require('./router/leadership')

const resetPasswordRoutes = require('./router/reset')


const app=express()

  
const AccessLogstream=fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'})
app.use(morgan('combined',{stream:AccessLogstream}))


app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())

app.use('/user',asad)
app.use('/expense',payment)
app.use('/premium',leader)
app.use(resetPasswordRoutes)
app.use((req,res)=>{
    console.log(req.url)
res.sendFile(path.join(__dirname,`public/${req.url}`))
})

user.hasMany(expense)
expense.belongsTo(user)

user.hasMany(Order)
Order.belongsTo(user)


user.hasMany(Forgotpassword);
Forgotpassword.belongsTo(user);

user.hasMany(file_download);
file_download.belongsTo(user);

sequelize.sync().then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))