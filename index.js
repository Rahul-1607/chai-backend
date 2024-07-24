const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();

app.get('/',(req,res) => {
    res.json({
        message:'die with memories not dreams'
    })
})



app.listen(5000,() => {
    console.log('server is running on port 6000')
})