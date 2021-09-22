const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const config = require('config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || config.get('port') || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '100kb'}))
app.use("/api/auth/", require('./routes/auth.routes.js'))
app.use('/api/books/', require('./routes/book.routes.js'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

Start()

async function Start(){
    console.log(PORT)
    try{
        await mongoose.connect(config.get("mongoUrl"))
        app.listen(PORT, ()=>{
            console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}`)
        })
    }catch (e){
        console.log(e)
        process.exit(1)
    }
}

