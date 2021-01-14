const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {validationResult, param} = require('express-validator/check');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Users = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}));

exports.getSign = (req, res) =>{
    
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null; 
    }
    
    res.render('sign',
    {webTitle: 'Sign Up Page', 
    // isAuthenticated: req.isLoggedIn
    errorMessage: message,
    oldInput:{
        email: '',
        firstN: '',
        lastN: '',
        gender: '',
        password: '',
        confirmPassword: ''
    },
    validationErrors: []
});
};

exports.postSign = (req, res) => {
    firstName = req.body.firstN;
    lastName = req.body.lastN;
    gender = req.body.gender;
    email = req.body.email;
    password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('sign',
        {webTitle: 'Sign Up Page', 
        errorMessage: errors.array()[0].msg,
        oldInput:{
            email: email,
            firstN: firstName,
            lastN: lastName,
            gender: gender,
            password: password,
            confirmPassword: req.body.confirmPassword
        },
        validationErrors: errors.array()
    });
    }

    bcrypt.hash(password, 12, function(err, hash){
        const user = new Users(firstName,
            lastName,
            gender,
            email,
            hash);
            user.save()
            .then(result =>{
                console.log('Created User');
                res.redirect('/login');
                return transporter.sendMail({
                    to: email,
                    from:'inbal_project@walla.co.il',
                    subject:'Signup succeeded',
                    html: '<h1>You successfully signed up </h1>'
                });
            }).catch(err =>{
                console.log(err);
            })
            .catch(err =>{
                console.log(err);
            });
    });  
};

exports.getLogin = (req, res) =>{
    // console.log(req.session.isLoggedIn);

    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null; 
    }
    
    res.render('login', 
    {webTitle: 'Login Page',
    errorMessage: message,
    oldInput:{
        email: '',
        password: ''
    }
});
};

exports.postLogin = (req, res) =>{
    // res.setHeader('Set-Cookie', 'loggedIn = true');
    // const isLoggedIn  = req.get('Cookie').trim().split('=')[1];
    // req.isLoggedIn = true;
    // console.log(req.body._csrf === req.cookies._csrf);
    // req.session.isLoggedIn = true;
    // const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;

    Users.findBySecurity(email, password, (user) =>{
        // console.log(user);
        if (!user){
        //  req.flash('error','Invalid email or password');
        // console.log(errors.array());
         return res.status(402).render('login', {
             path:'/login',
             webTitle:'Login',
             errorMessage: 'Invaild email or password',
             oldInput:{
                 email: email,
                 password: password
             },
         });
        }
        req.session.isLoggedIn = true;
        return res.render('main',
        {   webTitle: 'main ' ,
            path:'/main',
            user: user,
            // isAuthenticated: req.session.isLoggedIn
        })
    });
};



exports.postLogout = (req, res) =>{
    req.session.destroy(err =>{
        console.log(err);  
        res.redirect('/');
    });
 
};


exports.getUsers = (req,res)=>{
    Users.fetchAll()
    .then(users =>{
        res.render('main', 
        {webTitle: 'Sport Web',
        path: '/',
        usersArray: users,
        // isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err =>{
        console.log(err);
    });       
};









