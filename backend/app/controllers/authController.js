const db = require('../models');
const mailService = require('../mailService');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

// Taken from RFC 5322
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = {
    signIn: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        if (email === undefined || password === undefined) {
            return res.send({
                status: 1,
                message: 'Incorrect email or password',
            });
        } else if (req.session.userId) {
            return res.send({
                status: 3,
                message: 'Already signed in. Sign out before signing in',
            });
        } else {
            db.User.authenticate(email, password, (err, instance) => {
                if (instance) {
                    req.session.userId = instance._id;
                    return res.send({
                        status: 0,
                        message: 'ok',
                        id: req.session.userId
                    });
                } else {
                    return res.send({
                        status: 1,
                        message: 'Incorrect email or password',
                    });
                }
            });
        }
    },

    signOut: (req, res) => {
        if (req.session.userId) {
            req.session.destroy();
            return res.send({
                status: 0,
                message: 'ok',
            });
        } else {
            return res.send({
                status: 3,
                message: 'User not signed in',
            });
        }
    },

    signUp: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        if (email === undefined || password === undefined || firstname === undefined || lastname === undefined) {
            return res.send({
                status: 2,
                message: 'Missing email, password, firstname, or lastname',
            });
        } else if (!EMAIL_PATTERN.test(email)){
            return res.send({
                status: 2,
                message: 'Malformed email address',
            });
        }

        crypto.randomBytes(128, (err, buffer) => {
            let token = buffer.toString('base64');
            token = encodeURIComponent(token);
            // Only insert when email not found in db
            db.User.getByEmail(email, (err, instance) => {
                if (!instance) {
                    db.User.insertInactivated(email, password, firstname, lastname, token, (err, instance) => {
                        mailService.sendSignUpVerification(token, email);
                    });
                }
            });
        });

        // Always return success to defend username enumeration attacks.
        return res.send({
            status: 0,
            message: 'ok',
        });
    },

    verify: (req, res) => {
        //encode the token
        let token = encodeURIComponent(req.query.token);
        db.User.getByActivationToken(token, (err, instance) => {
            if (instance) {
                db.User.activate(instance, (err, instance) => {
                    if (instance) {
                        return res.send({
                            status: 0,
                            message: 'ok',
                        });
                    } else {
                        console.log(err);
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                })
            } else {
                return res.send({
                    status: 4,
                    message: 'Link is incorrect or has expired',
                });
            }
        });
    },

    resetPasswordRequest: (req, res) => {
        let email = req.body.email;
        if (email === undefined) {
            return res.send({
                status: 2,
                message: 'Missing email',
            });
        } else if (!EMAIL_PATTERN.test(email)) {
            return res.send({
                status: 2,
                message: 'Malformed email address',
            });
        } else {
            db.User.getActivatedByEmail(email, (err, instance) => {
                if (instance) {
                    let token;
                    crypto.randomBytes(128, (err, buffer) => {
                        token = buffer.toString('base64');
                        token = encodeURIComponent(token);
                        db.User.registerPasswordResetToken(instance, token, (err, instance) => {
                            
                            if (instance) {
                                mailService.sendPasswordResetVerification(token, email);
                            }
                        });
                    });
                }
            });
            // Always return success to defend username enumeration attacks.
            return res.send({
                status: 0,
                message: 'ok',
            });
        }
    },

    resetPassword: (req, res) => {
        let token = req.body.token;
        let password = req.body.password;
        db.User.getByPasswordResetToken(token, (err, instance) => {
            if (instance) {
                if (password === undefined) {
                    return res.send({
                        status: 4,
                        message: 'Missing password',
                    });
                }
                db.User.resetPassword(instance, password, (err, instance) => {
                    if (instance) {
                        return res.send({
                            status: 0,
                            message: 'ok',
                        });
                    } else {
                        console.log(err);
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                })
            } else {
                return res.send({
                    status: 4,
                    message: 'Link is incorrect or has expired',
                });
            }
        });
    },

    getProfile: (req, res) => {
        let id = req.query.id;
        db.User.getById(id, (err, instance) => {
            if (instance) {
                return res.send({
                    status: 0,
                    message: 'ok',
                    email: instance.email,
                    firstname: instance.firstname,
                    lastname: instance.lastname,
                });

            }else {
                console.log(err);
                return res.send({
                    status: -1,
                    message: 'internal error',
                });
            }
        });
    },

    editProfile: (req, res) => {
        let email = req.body.email;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let id = req.body.id;
        if (email == '' || firstname == '' || lastname == '') {
            return res.send({
                status: 1,
                message: 'Field empty'
            })
        }
        db.User.getById(id, (err, instance) => {
            if (instance) {
                db.User.editProfile(instance, email, firstname, lastname, (err, instance) => {
                    if (instance){
                        return res.send({
                            status: 0,
                            message: 'ok',
                        });
                    }else{
                        console.log(err);
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                });
            }else{
                console.log(err);
                return res.send({
                    status: 2,
                    message: 'Setup issue, user not found',
                });
            }
        });
    },

    checkPassword: (req, res) => {
        let id = req.query.id;
        let password = req.query.password;
        if (password == ''){
            return res.send({
                status: 2,
                message: 'Missing password'
            })
        }
        db.User.getById(id, (err, instance) => {
            if (instance) {
                if (bcrypt.compareSync(password, instance.password)) {
                    return res.send({
                        status: 0,
                        message: 'ok',
                    });
                }else{
                    return res.send({
                        status: 1,
                        message: 'wrong password',
                    });
                }
            
            }else {
                console.log(err);
                return res.send({
                    status: -1,
                    message: 'internal error',
                });
            }
        });
    },

    resetPasswordUserProfile: (req, res) => {
        let id = req.body.id;
        let password = req.body.password;
        db.User.getById(id, (err, instance) => {
            if (instance) {
                let email = instance.email;
                db.User.resetPasswordUserProfile(instance, password, (err, instance) => {
                    if (instance){
                        mailService.sendPasswordResetVerificationUserProfile(email);
                        return res.send({
                            status: 0,
                            message: 'ok',
                        });
                    }else{
                        console.log(err);
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                });
            }else{
                console.log(err);
                return res.send({
                    status: -1,
                    message: 'internal error',
                });
            }
        });
    },

    
};