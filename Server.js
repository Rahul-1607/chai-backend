const express = require("express");
const app = express();
const db = require("./db");
const route = require("./Routes/personRoutes.js");
const passport = require('./auth.js')
// const Post = require('./Routes/post')
require('dotenv').config();
 
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body 

app.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', {session:false})

app.get('/',localauthmiddleware,(req,res) => {
  res.send('welcome to the Taj hotel')
})
 
// app.use(logRequest); 

app.use('/person',route)   
 
app.listen(PORT, () => {
  console.log("listening port on 3000");
});




  











// middleware function 


// const logRequest = (req,res,next) => {
//   console.log('[${new Date().toLocaleString()}] Request Made to : ${req.orignalUrl}')
//   next();
// }