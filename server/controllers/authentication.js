const User=require('../models/user');
const jwt =require('jwt-simple');
const config =require('../config');

function tokenForUser(user){
    const timestamp=new Date().getTime();
    return jwt.encode({sub:user.id, iat:timestamp},config.secret);
}
exports.signin=function(req,res,next){
    /*
    User has already had their email and password auth'd
    we just need to give them a token*/
    res.send({token:tokenForUser(req.user)});
}

exports.signup=function(req,res,next){
    const email =req.body.email;
    const password= req.body.password;

    //if user provided doesnt have oth fields, return an error
    if(!email || !password)return res.status(422).send({error:'you must provide email and password'});

    //see if a user with the email exists
    User.findOne({email},function(err,existingUser){
        if(err) {return next(err);} //if error connection b

        //is a user with email does exist, return error
        if(existingUser)return res.status(422).send({error:'Email is in use'});



        //if a user with email does not exist , create and save user record
        const user= new User({
            email,password:password
        });

        user.save((err)=>{
            if(err) return next(err);

            //respond to request indicatin he user was created
            res.json({token:tokenForUser(user)});
        });
    });
}
