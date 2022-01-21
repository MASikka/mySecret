const passport = require('passport');
const User = require('../models/user');

exports.getMainPage = (req,res)=>{
    res.render('home');
}

exports.getRegisterPage = (req,res)=>{
    res.render('register');
}

exports.getLoginPage = (req,res)=>{
    res.render('login');
}

exports.postRegister = (req,res)=>{
    User.register({username: req.body.username}, req.body.password, (error,user)=>{
        if(error){
            console.log(error);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res, ()=>{
                res.render('/secrets');
            });
        }
    });
}

exports.postLogin = (req,res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (error)=>{
        if(error){
            console.log(error);
            res.redirect('/login');
        }else{
            passport.authenticate('local')(req,res, ()=>{
                res.redirect('/secrets');
            });    
        
    }})
}

exports.getSecrets = (req,res)=>{
    if(req.isAuthenticated()){
        User.find({'userSecret': {$ne:null} },(error, usersFound)=>{
            if(error){console.log(error);
            }else{
                res.render('secrets', {usersSecrets: usersFound});
            }
        });
        
    }else{
        res.redirect('/login');
    }
}

exports.getSubmit = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('submit');
    }else{
        res.redirect('/login');
    }
}

exports.postSubmit = (req,res)=>{
    const submittedSecret = req.body.secret;

    User.findById(req.user.id, (error, userFound)=>{
        if(!error){
            userFound.userSecret = submittedSecret;
            userFound.save((error)=>{
                if(!error){
                    console.log('secret added');
                    res.redirect('/secrets');
                }
            });
        }
    })
}
exports.getLogout = (req,res)=>{
    req.logout();
    res.redirect('/');
}