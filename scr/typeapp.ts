import express from "express"
import router from "./router/router"
import bodyParser from "body-parser"
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.listen({port:3000})
