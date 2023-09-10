const express=require('express')
const router=express.Router()

const leader=require('../controller/leader')
router.get("/leadership",leader.leadership)
module.exports=router