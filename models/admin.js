const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const mailer =  require('../routes/mailer');




// Admin Schema
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

//GET

module.exports.getUserById = function(id, callback){
    Admin.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    Admin.findOne(query, callback);
};


//POST
module.exports.addUser = function(newAdmin, callback){
    console.log('new USER: ' + newAdmin);
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if(err) throw err;
            newAdmin.password = hash;
    newAdmin.save(callback);
        });
    });
};

//PUT


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};


// change password logic


