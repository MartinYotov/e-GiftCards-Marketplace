'use strict';
const jwt = require('jsonwebtoken');
const constants = require('../utilities/constants');
const encryptor = require('../utilities/encryptor');

module.exports = ({ data }) => {
    return {
        getUser(req, res) {
            const username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    //if (user)
                    res.status(200).json(user);
                }).
                catch(err => {
                    console.error(err);
                    res.status(500);
                });
        },
        register(req, res) {
            const body = req.body;
            const user = {
                username: body.username,
                passHash: body.password,
                firstName: body.firstName,
                lastName: body.lastName,                
                email: body.email,
                giftCards: [],
                watchlist: []
            };
            console.log('register contr ' + user.username);
            data.createUser(user)
                .then(() => {
                    res.json({ message: 'Registration successfull' });
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error:{ message: 'Registration failed!' }});
                });
        },
        loginLocal(req, res, next) {
            const username = req.body.username;
            const password = req.body.password;

            data.getUserByUsername(username)
                .then(user => {
                    if (!user) {
                        res.status(401).json({error: { message: "Wrong username or password" }});
                    }

                    const passHash = encryptor.getPassHash(user.salt, password);

                    if (user.passHash === passHash) {
                        console.log('final stage');
                        const payload = { id: user._id };
                        console.log(payload);
                        const token = jwt.sign(payload, constants.secret, {
                            expiresIn: '24h' 
                        });
                        console.log(token);
                        res.json({message:'Login successful', success: true, user: { username: user.username, token: 'JWT '+token } });
                    } else {
                        res.status(401).json({error: { message: "Wrong username or password" }});
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ error:{message:'Wrong username or password' }});
                })

        },
        editProfile(req, res) {
            const email = req.user.email;
            console.log('email', email);

            const userInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };

            data.updateUserInformation(email, userInfo)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Profile information updated!' } });
                })
                .catch(() => {
                    return res.status(500).json({ error: { message: "User information could not be updated" } })
                });
        },
        logout(req, res) {
            console.log(123);
            console.log(req);
            req.logout();
            res.status(202).json({
                succes: true,
                message: `User is logged out succesfully`
            });
        },
    }
}