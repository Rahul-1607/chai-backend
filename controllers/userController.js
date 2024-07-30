const User = require('../models/user.models')
const bcrypt = require('bcrypt')

const {validationResult} = require('express-validator')

const userRegister = async (req, res) => {
  try {
    console.log('Received registration request:', req.body);

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      console.log('All fields are  must required')
      return res.status(400).json({
      success: false,
      msg:errors,
      errors: errors.arrays()
    });
    }
    const { name, email, mobile, password } = req.body;

     const isExist = await User.findOne({ email: email });
    if (isExist) {
      console.log('Email already exists:', email);
      return res.status(400).json({ 
        success: false,
        msg: 'Email already exists!'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name, 
      email,
      mobile,
      password: hashedPassword,
      image:'images/'+req.file.filename
    });

    const userData = await user.save();
    console.log('User registered successfully:', userData);

    return res.status(200).json({
      success: true,
      message: 'Registered successfully'
    });

  } catch (error) {
    console.log('Error during registration:', error.message);
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

module.exports = {
    userRegister
}


