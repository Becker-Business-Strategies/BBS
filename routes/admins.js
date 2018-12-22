const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');



router.post('/register', (req, res, next) => {
    let newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password,
        newPassword: req.body.newPassword,
        verifyPassword: req.body.verifyPassword,
        resetPasswordExpires: req.body.resetPasswordExpires,
        resetPasswordToken: req.body.resetPasswordToken
    });

    Admin.addUser(newAdmin, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user, username is taken -- ' + err});
            console.log('error: ' + err)
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('starting /authenticate with: ' + username + ' ' + password);
    Admin.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        Admin.comparePassword(password, user.password, (err, isMatch) => {
            console.log('*PARAMETERS*');
            console.log('');
            console.log('USER: ' + user);
            console.log('Entered Password: ' + password);
            console.log('Password on file: ' + user.password);
            console.log('isMatch: ' + isMatch);

            if(err) throw err;
            if(isMatch){
                console.log('Entering isMatch Promise...');
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 10800 // 3 hr
                });
                console.log(config.secret);
                console.log(token);


                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                    }

                });
                console.log('User after login: '+ user)
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session:false},), (req, res, next) => {
    res.json({
        user: req.user,
    });
});


//UPDATE USER

router.put('/update/:id', function (req, res) {

    console.log('updating user --> id: ' + req.params.id + ' -- BODY: ' + req.body);

    Admin.findByIdAndUpdate(req.params.id, req.body, function (err, updatedUser) {
        if(err){
            res.json({
                success: false,
                msg: 'ERROR: ' + err
            });
            console.log('ERROR ' + err + res)
        }else{
            res.json({
                success: true,
                data: updatedUser,
                msg: 'Success!'
            });
            console.log('Updated User: ' + updatedUser);
        }
    });
});


router.put('/resetPassword/:id', function(req, res, next) {

    console.log('REQ PARAMS ID: ' + req.params.id);
    console.log('REQ BODY: ' + req.body.verifyPassword);

    let password = req.body.newPassword;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            console.log(hash);
        });
    });

    Admin.findByIdAndUpdate(req.params.id, req.body.newPassword, function (err, updatedUser) {
        if(err){
            res.json({
                success: false,
                msg: 'ERROR: ' + err
            });
            console.log('ERROR ' + err + res)
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    password = hash;
                    console.log(hash);
                });
            });
            res.json({
                success: true,
                data: updatedUser,
                msg: 'Success!'
            });
            console.log('Updated User: ' + updatedUser);
        }
    });



});




module.exports = router;