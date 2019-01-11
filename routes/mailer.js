const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const process = require('process');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const async = require('async');
const Admin =  require('../models/admin');
const crypto = require('crypto');





router.post('/newClient', function (req, res, next) {

    let recipients = 'swb@beckerbusinessstrategies.com';
    let subjectTime = new Date();

    let client = req.body;
    console.log(client);
    console.log(recipients);
    console.log(subjectTime);


    let htmlBody =

        '<div style="font-size: 44px; margin-bottom:40px; color: #000000;line-height: 56px; letter-spacing: -0.8px; font-weight: 800; margin-top: 40px; padding-left: 24px; border-left: 10px solid #17664b;">New Message!</div>' +
        '<table style="width: 100%">'+
            // FROM
            '<tr>'+
                '<td id="col1" style="font-weight: bold; color: #17664b">' +
                    'From: ' +
                '</td>'+
                '<td id="col2" style="font-weight: lighter; color: #2b2b2b; width: 100%;">' +
                    client.name + ' ' + client.last +
                '</td>'+
            '</tr>'+
            // EMAIL
            '<tr>'+
                '<td style="font-weight: bold; color: #17664b">' +
                    'Email: ' +
                '</td>'+
                '<td style="font-weight: lighter; color: #2b2b2b">' +
                    '<a href="mailto:' + client.email + '">' + client.email + '</a></div>' +
                '</td>'+
            '</tr>'+
            // PHONE
            '<tr>'+
                '<td style="font-weight: bold; color: #17664b">' +
                    'Phone: ' +
                '</td>'+
                '<td style="font-weight: lighter; color: #2b2b2b">' +
                    '<a href="tel:' + client.phone + '">' + client.phone + '</a></div>' +
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td height="100px" style="font-weight: bold; font-size: 18px; color: #17664b">' +
                    'Message: ' +
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td colspan="2" height="100px" width="50%" style="font-weight: lighter; color: #2b2b2b">' +
                    client.message +
                '</td>'+
            '</tr>'+
            '<tr>' +
                '<td>' +
                    '<table cellspacing="0" cellpadding="0">' +
                        '<tr>' +
                             '<td class=”button” style="background-color: #17664b">' +
                                '<a href="mailto:' + client.email + '" style="padding: 8px 12px; border: 1px solid #17664b;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">'+
                                    'Reply' +
                                '</a>'+
                             '</td>'+
                        '</tr>'+
                    '</table>'+
                '</td>'+
            '</tr>'+
        '</table>'


    ;


    sendNewMail();

    function sendNewMail() {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'beckersolutionsteam@gmail.com',
                pass:  process.env.GMAILPW
            }
        });

        let mailOptions = {
            from: 'Becker Business Clients <beckersolutionsteam@gmail.com>',
            to: recipients,
            subject: 'New Message Received!',
            html: htmlBody
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return console.log(err);
            }
            console.log('Message sent to: ' + info.response);
            console.log('email sent to: ' + mailOptions.to + '...' + new Date());
        });
    }
});

module.exports = router;