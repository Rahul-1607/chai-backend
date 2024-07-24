const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next) => {
    console.log('>>>>>>>>>>>>>>>>>>jwtauthmiddleware:>>>>>>>>>>>>>')

    const authorization = req.headers.authorization;

    if(!authorization) return res.status(401).json({error:'Authorization is not found:'})
    
    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'token is not generate'})

    try {
        // verify the jwt token
      const decode = jwt.verify(token,process.env.JWT_SECRET)

      // Attach user information to the request object
      req.body=decode;
      next()
    } catch (error) { 
        console.log(error);
        res.status(500).json({error:'invalid token'})
    }
}

// function to generate token
const generateToken =(userdata) => {

    // Generate a new JWT token using user data
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:40000});
}

module.exports={jwtAuthMiddleware, generateToken}