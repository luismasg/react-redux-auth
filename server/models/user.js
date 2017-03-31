const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt-nodejs');
//defina our model
const userSchema = new Schema ({
    email:{type:String,unique:true, lowercase:true},
    password:String
});

//on save hook , ecrypt password
//before saving a model , run this function
userSchema.pre('save',function(next){
    const user=this;//get accces to thr user model
    bcrypt.genSalt(10,function(err,salt){/*generate a salt,then run callback */
        if (err)return next(err);
        bcrypt.hash(user.password,salt,null,function(err,hash){/S* has (encrypt) our password using the salt*/
            if (err)return next(err);
            user.password=hash;
            next();

        });
    });
});


userSchema.methods.comparePassword=function(candidatePassword,callback){
bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    if(err) return callback(err);
    callback(null,isMatch);
})
}

//create the model class
const ModelClass=mongoose.model('user',userSchema);


//export the model
module.exports= ModelClass;
