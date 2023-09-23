const express=require('express')
const router=express.Router()
const controllerUser=require('../controller/user')
const expensecontroller=require('../controller/user_expense')
const authorize=require('../authenticatation')


router.post('/signup',controllerUser.signup)

router.post('/login',controllerUser.login)

router.post('/expense',authorize.authenticate,expensecontroller.expense)
router.get('/detail',authorize.authenticate,expensecontroller.getexpense)
router.delete('/delete/:id',authorize.authenticate,expensecontroller.deleteExpense)
router.get('/download',authorize.authenticate,expensecontroller.download)
router.get('/file',authorize.authenticate,expensecontroller.download_file)
module.exports=router