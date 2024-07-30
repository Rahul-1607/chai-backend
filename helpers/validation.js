const {check} = require('express-validator')

exports.registerValidator = [
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('mobile','Mobile no. should be contain 10 didgits').isLength({
        max:10,
        min:10
    }),
    check('password','password must be greater than 6 characters and contains atleast one uppercase letter')
    .isStrongPassword({
        minLength:6,
        minUppercase:1,
        minLowercase:1,
        minSymbols:1
    }),
    check('image')
.custom( (value, {req}) => {
    if(req.file.mimetype ==='image/jpeg' || req.file.mimetype ==='image/png') {
        return true;
    }
    else {
        return false;
    }
}).withMessage("please upload an image Jpeg, PNG")
]