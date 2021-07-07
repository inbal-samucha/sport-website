https://sport-websit.herokuapp.com/
# sport-website
This project deals with sports and fitness training and presents training for different body parts.
In order to see the various fitness workouts you need to register on the site.
This project was built using Node.js and Express together with the mongodb database. <br>

### Tech/framework used:
* visual code <br>
* Node.js 12.18.2 <br>
* express 4.17.1 <br><br>

### Installing 

``` npm install ```<br>
to install all packages in project.<br><br>

``` npm start ``` <br>
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.<br><br>

### Code Examples 

Registering the Routes:
```javascript
const signControllers = require('../controllers/users');
router.get('/sign', signControllers.getSign);
router.get('/login', signControllers.getLogin);
```
```javascript
exports.getLogin = (req, res) =>{
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

exports.getSign = (req, res) =>{
    
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null; 
    }
    
    res.render('sign',
    {
    webTitle: 'Sign Up Page', 
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
```
Connect MongoDB:
```javascript
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const mongoConnect = (callback) =>{
    mongoClient.connect('mongodb+srv://inbal_sam:is9792845@cluster0.qnl2e.mongodb.net/sport?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected');
        db = client.db();
        callback();
    })
    .catch(err =>{
        console.log(err);
        throw err;
    }); 
};
```


Store session in MongoDB: 
``` javascript
const store = new mongodbStore({
    uri:'mongodb+srv://inbal_sam:is9792845@cluster0.qnl2e.mongodb.net/sport?retryWrites=true&w=majority',
    connection: 'sessions'
}); 
app.use(session
    ({secret: 'my secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store}));
```

Fetching a Single Product from MongoDB:
```javascript
static findBySecurity(userEmail, userPassword, cb){

        const db = getDb();
        return db.collection('users')
        .findOne({email:userEmail})
        .then(user =>{
            if(user){
                bcrypt.compare(userPassword, user.password)
                .then(ifMatch =>{ 
                    if(ifMatch){
                        cb(user) ; 
                    }   
                    else {
                        cb();
                    } 
                })
                .catch(err => console.log(err));
            }
            else{
                cb(null);
            }
         })
        .catch(err =>console.log(err));
}
```
Validation:
```javascript
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
```
Encrypting Passwords & Sending verification email:
```javascript
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
 ```
 
 Adding CSRF Protection:
 ```javascript
app.use(csrfProtaction); 
app.use((req,res,next) =>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
```
```html
<form class="login-form" action="/login" method="POST">
    <input type="hidden" name="_csrf" value="<%= csrfToken%>">
    <div id="security">
        <label for="email" >Email:</label>
        <input type="text" name="email" id="email" value="<%= oldInput.email %>" placeholder="Insert your email"><br>
        <label for="password">password:</label>
        <input type="password" name="password" id="password" value="<%= oldInput.password %>" placeholder="password"><br>
    </div>
    <button  type="submit"> Login </button>
</form>
```


    
