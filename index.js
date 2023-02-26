require('dotenv').config();
const express =require('express');
const app = express();

const {PORT} = process.env;
const port = 8000 || PORT;

const jsonParser = express.json();
app.use(jsonParser); 


const path = require('path');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const connectDB =require('./database/connection');

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'sessionlet' }))

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));

app.set('views',[path.join(__dirname, 'views')]);

app.set('view engine', 'ejs');

//mongo connection
connectDB();

//login required
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

//--------------------------------------------------------------
// Index page
app.get('/',(req,res)=>{
    res.render('index.ejs');
});


//------------------------------------------------

//register and login
//-----------------------------------------------------

app.get('/login',(req,res)=>{
	res.render('login.ejs')
})

app.get('/register',(req,res)=>{
	res.render('register.ejs')
})

app.listen(port, () => {
    console.log(`Server started listen to the port ${port}`);
})
