const express = require('express');

const routes = express.Router();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');

const leaseAgreement = mongoose.model('LeaseAgreement');

const user = mongoose.model('User');

const passport = require('passport');

const cookieParser = require('cookie-parser');

const flash = require('connect-flash');

const session = require('express-session');

routes.use(bodyParser.urlencoded({extended:true}));

routes.use(cookieParser('secret'));
routes.use(session({
    secret : 'secret',
    maxAge : 3600000,
    resave :true,
    saveUninitialized : true
}));
routes.use(passport.initialize());
routes.use(session());

routes.use(flash());

routes.use(function(req,res,next){
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
     next();
});

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Database Connected"));

routes.get('/',(req,res)=>{
    res.render('index');
});


routes.post('/register',(req,res)=>{
    var {email,username,password,confirmpassword} =req.body;
    if(!email || !password || !username || !confirmpassword){
        err = "Please Fill All The Fields...";
        res.render('index',{'err':err});
    }
    if(password != confirmpassword){
        err="Password Don't Match";
        res.render('index',{'err': err, 'email': email,'username': username});
        
    }
    if(typeof err == 'undefined'){
        user.findOne({ email :email }, function(err,data){
            if(err)throw err;
            if(data){
                console.log("User Exits");
                err = "User Already Exists with This Email...";
                res.render('index',{'err': err,'email' : email, 'username' : username});
            }else{
                bcrypt.genSalt(10,(err,salt)=>{
                    if(err)throw err;
                    bcrypt.hash(password, salt , (err,hash) => {
                        if(err)throw err;
                        password = hash;
                        user({
                            email,
                            username,
                            password
                        }).save((err,data)=>{
                            if(err)throw err;
                            req.flash('success_message','Registered Successfull...Login To Continue..');
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    }
});


//authentication strategy
var localStrategy = require('passport-local');
passport.use(new localStrategy({ usernameField : 'email'},(email,password,done)=>{
    user.findOne({email : email}, (err,data)=>{
        if(err) throw err;
        if(!data){
            return done(null,false,{messge:"User Doesn't Exist.."});
        }
        bcrypt.compare(password,data.password,(err,match)=>{
            if(err){
                return done(null,false);
            }
            if(!match){
                return done(null,false,{message:"Password Doesn't Match"});
            }
            if(match){
                return done(null,data);
            }
        });

    });
}));
passport.serializeUser(function(user,cb){
    cb(null,user.id);
});

passport.deserializeUser(function(id,cb){
    user.findById(id,function(err,user){
       cb(err,user);
    });
});

//end of authentication strategy
routes.get('/login',(req,res)=>{
    res.render('login');
});

routes.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        failureRedirect:'/login',
        successRedirect:'/dashboard',
        failureFlash:true,
        // failureMessage:true
    })(req,res,next);
});


routes.get('/dashboard' ,(req,res)=>{
    res.render('dashboard');
});

routes.get('/leaseAgreement',(req,res)=>{
    res.render('leaseAgreement');
});

routes.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
});

routes.get('/twopeople',(req,res)=>{
    res.render('twopeopleAgreement');
});

routes.get('/threepeople',(req,res)=>{
    res.render('threepeopleAgreement');
});

routes.get('/fourpeople',(req,res)=>{
    res.render('fourpeopleAgreement');
});

routes.get('/aboutUs',(req,res)=>{
    res.render('aboutUs');
});
router.get('/successPage',(req,res)=>{
    var {agreementDate,startDate,companyName,street,state,furnitureName,agreementNo,postCode,totalMonthlyRate} =req.body;
    if(!agreementDate || !startDate || !companyName || !street ||!state || !agreementNo || !postCode || !furnitureName ||!totalMonthlyRate){
        err = "Please Fill All The Details...";
        res.render('leaseAgreement',{'err':err});
    }
    if(typeof err == 'undefined'){
            leaseAgreement.save((err,data)=>{
                if(err) throw err;
                res.render('successPage');
            })
    }
});

module.exports = routes;