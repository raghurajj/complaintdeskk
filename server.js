const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()

app.use(express.json()) 

const db = config.get('mongoURI')

mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true})
    .then(()=>console.log("mongoDB connected..."))
    .catch(err => console.log(err))


app.use('/api/complaints',require('./routes/api/complaints'))

app.use('/api/users',require('./routes/api/users'))

app.use('/api/auth',require('./routes/api/auth'))

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server started on port ${port}`))   