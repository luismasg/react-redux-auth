const passport = require('passport');
const User= require('../models/user');
const config=require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

//create locsl Strategy
const localOptions={usernameField:'email'};

const localLogin = new localStrategy(localOptions,function(email,password,done){
    /*verify this username and password ,
    call done with the user if it is the correct user and password.
    otherwise call done with false
    */

    User.findOne({email},function(err,user){
        if(err)return done(err);
        if(!user)return done(null,false);

        //compare password - is password equal to user.password
        user.comparePassword(password,function(err,isMatch){
            if(err)return done(err);
            if(!isMatch)return done(null,false);

            return done(null,user);
        });

    });

});


//setup options for JWT strategy
const jwtOptions={
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.secret
};

//create JWT Strategy
const jwtLogin=new JwtStrategy(jwtOptions,function(payload,done){
    /* see if the user id in the payload exists in our DB.
    if it does, call 'done' with that user.
    other wise, call done without a user object*/

    User.findById(payload.sub,function(err,user){
        if(err){return done(err,false);}

        if(user){
            done(null,user);
        }else{
            done(null,false);
        }

    });
});

//tell passport to use the strategy

passport.use(jwtLogin);
passport.use(localLogin);
