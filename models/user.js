const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {type: String, required: [true, 'username is required'], unique: true},
    fullname: {type: String, required: [true, 'name is required']},
    email: {type: String, required: [true, 'email is required'], unique: true},
    password: {type: String, required: [true, 'password is required']},
});

userSchema.pre('save', function (next) {
    let user = this;

    if(!user.isModified('password')){
        return next();
    }

    bcrypt.hash(user.password, 10)
    .then((hash)=>{
        user.password = hash;
        next();
    })
    .catch((err)=>{
        next(err);
    });
});

userSchema.methods.comparePassword = function (loginPassword) {
  return bcrypt.compare(loginPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
