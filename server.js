const express = require('express')
const app= express()
const db = require('./db')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// import route file 
const userRoute = require('./routes/userRoute')

// use of  route
app.use('/api',userRoute)


app.get('/',(req,res) => {
    res.send('hii');
})

app.listen(PORT,() =>{
    console.log('port is running on server is -:',PORT);
})