
const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongodbStore = require('connect-mongodb-session')(session);
const mongoConnect = require('./util/database').mongoConnect;
const csrf = require('csurf');


const app = express();
const store = new mongodbStore({
    uri:'mongodb+srv://inbal_sam:is9792845@cluster0.qnl2e.mongodb.net/sport?retryWrites=true&w=majority',
    connection: 'sessions'
}); //store session in mongoDB
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const csrfProtaction = csrf({cookie: true});

app.set('view engine', 'ejs');
app.set('views', 'views');

const mainRouter = require('./routes/main');
const signRouter = require('./routes/sign');
const trainingRouter = require('./routes/training');

app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));

app.use(session
    ({secret: 'my secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store}));

app.use(csrfProtaction); 
app.use(flash());

app.use((req,res,next) =>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(mainRouter);
app.use(signRouter.routes);
app.use(trainingRouter.routes);

app.use((req,res) => { 
    res.status(404)
    .render('404',
    {webTitle: 'Page Note Found', 
    path: '/404', 
    isAuthenticated: req.isLoggedIn});
});

mongoConnect(() =>{
    app.listen(process.env.PORT || 3000);
});
