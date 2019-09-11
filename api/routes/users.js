 'use strict';

 const express = require('express');
 const router = express.Router();
 const User = require('../models').User;
 const auth = require('basic-auth');
 const bcryptjs = require('bcryptjs');

 const authenticateUser = async (req, res, next) => {
     let message;
     // Parse the user's credentials from the Authorization header.
     const credentials = auth(req);
     if (credentials) {
         //Find user with matching email address
         const user = await User.findOne({
             raw: true,
             where: {
                 emailAddress: credentials.name,
             },
         });
         //If user matches email
         if (user) {

             const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
             //If password matches
             if (authenticated) {
                 console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}`);
                 if (req.originalUrl.includes('courses')) {
                     //If route has a courses endpoint, set request userId to matched user id
                     req.body.userId = user.id;
                 } else if (req.originalUrl.includes('users')) {
                     //If route has a users endpoint, set request id to matched user id
                     req.body.id = user.id;
                 }
             } else {
                 //Otherwise the Authentication failed
                 message = `Authentication failed for user: ${user.firstName} ${user.lastName}`;
             }
         } else {
             // No email matching the Authorization header
             message = `User not found for email address: ${credentials.name}`;
         }
     } else {
         //No user credentials/authorization header available
         message = 'Authorization header not found';
     }
     // Deny Access if there is anything stored in message
     if (message) {
         console.warn(message);
         const err = new Error('Access Denied');
         err.status = 401;
         next(err);
     } else {
         //User authenticated
         next();
     }
 }

 //Creates a user
 router.post('/users', async (req, res, next) => {
     try {
         const user = req.body
         //if there is a password
         if (user.password && user.firstName && user.lastName && user.emailAddress) {
             //hash the password
             user.password = bcryptjs.hashSync(user.password);
             //user validation for User model
             await User.create(user);
             res.location('/');
             res.status(201).end();
         } else {
             //Response with status 400
             res.status(400).end();
         }
     } catch (err) {
         if (err.message === "This e-mail already exists.") {
             console.log('Error 400 - Validation Error')
             res.status(400).json({
                 message: 'This e-mail already exists.'
             });
         } else {
             console.log('Error 500 - Internal Server Error')
             next(err);
         }
     }
 });

 //Returns the current authenticated user
 router.get('/users', authenticateUser, async (req, res) => {
     const user = await User.findByPk(req.body.id, {
         attributes: {
             exclude: ['password', 'createAt', 'updateAt'],
         },
     });
     res.json(user);
 })

 module.exports = router;