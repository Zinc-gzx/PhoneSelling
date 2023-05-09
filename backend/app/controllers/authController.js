const db = require('../models');

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

    //

};