const express = require('express')
const router=express();
const userController = require('../controllers/userController')
const {registerValidator} = require('../helpers/validation')
router.use(express.json())

const path = require('path')
const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, path.join(__dirname, '../public/images')
    )},
    filename: function(req,file,cb) {
        const name = Date.now() +'-'+file.originalname;
        cb(null,name)
    }
});

const upload = multer({storage:storage})


router.post('/register', upload.single('image'),registerValidator, userController.userRegister)


// router.post('/register',userController.userRegister)

module.exports=router;

