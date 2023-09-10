const express=require('express')
const router=express.Router()
const paymethod=require('../controller/payment')
const authorize=require('../authenticatation')
router.get('/pay',authorize.authenticate,paymethod.premiumpay)
router.post('/traction',authorize.authenticate,paymethod.tractions)

router.post('/failtraction',authorize.authenticate,paymethod.tractionfail)


module.exports=router