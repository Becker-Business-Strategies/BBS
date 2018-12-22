const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        last: req.body.last,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user' + err});
            console.log('error: ' + err)
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});






//Get All Users
router.get('/users', function(req, res) {
    User.find({},function (err, users) {
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});


//DELETE USER BY ID
router.delete('/user/:id', function (req, res) {
    console.log('deleting user...');
    User.findByIdAndRemove(req.params.id, function (err, deletedUser) {
        if(err){
            res.send({
                success: false,
                msg: 'Failed because: ' + err
            })
        }else {
            res.json({
                success: true,
                data: deletedUser,
                msg: 'Success!'
            });
        }
    });
});

//UPDATE USER BY ID

router.put('/update/:id', function (req, res) {
    console.log('updating user: ' + req.params.id, req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function (err, updatedUser) {
        if(err){
            res.json({
                success: false,
                msg: 'Failed'
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

module.exports = router;