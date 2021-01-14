const path = require('path');
const User = require('../models/user');
const {check, body} = require('express-validator/check');
const bodyParser = require('body-parser');

const signControllers = require('../controllers/users');

const express = require('express');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.get('/sign', signControllers.getSign);

router.get('/login', signControllers.getLogin);

router.post('/sign', [check('email')
.isEmail()
.withMessage('please enter a vaild email'), 
body('password', 'please enter a password with at least 4 characters')
.isLength({min:4}),
body('confirmPassword').custom((value, {req}) =>{
    if(value !== req.body.password){
        throw new Error('passwords dont match');
    }
    return true;
})
]
, signControllers.postSign);

router.post('/login', signControllers.postLogin);
router.post('/logout', signControllers.postLogout);


exports.routes = router;
