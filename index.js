const express = require('express')
const mongoConnection = require('./connection')
const cors = require('cors')
require('dotenv').config()
mongoConnection(process.env.URI)
const app = express()
app.get('/',(req,res)=>{
    res.send(`Hello world`)
})


app.listen(process.env.PORT)