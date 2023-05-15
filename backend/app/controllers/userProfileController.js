const db = require('../models');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

module.exports = {
    getPhoneList: (req, res) => {
        let id = req.query.id;
        db.Phone.getPhoneById(id, (err, instance) => {
            if (instance) {
                return res.send({
                    status: 0,
                    message: 'ok',
                    phones: instance
                });
            } else {
                console.log(err);
                return res.send({
                    status: -1,
                    message: 'internal error',
                });
            }
            
        });
    },

    addPhone: (req, res) => {
        let seller = req.body.id;
        let title = req.body.title;
        let brand = req.body.brand;
        let image = '../data/img/' + brand + '.jpeg';
        let stock = req.body.stock;
        let price = req.body.price;
        db.Phone.insertPhone(seller, title, brand, image, stock, price, (err, instance) => {
            if (instance) {
                return res.send({
                    status: 0,
                    message: 'ok',
                    phones: instance
                });
            } else {
                console.log(err);
                return res.send({
                    status: -1,
                    message: 'internal error',
                });
            }
            
        });
    },

    deletePhone: (req, res) => {
        let id = req.body._id;
        db.Phone.deletePhone(id, (err, instance) => {
            if (instance) {
                return res.send({
                    status: 0,
                    message: 'ok',
                    phones: instance
                });
            } else {
                console.log(err);
                return res.send({
                    status: -1,
                    message: 'internal error',
                });
            }
            
        });
    },

    enablePhone: (req, res) => {
        let id = req.body._id;
        db.Phone.getPhoneByPhoneId(id, (err, instance) => {
            if (instance) {
                console.log(instance);
                db.Phone.enablePhone(instance, (err, instance) => {
                    if(instance){
                        return res.send({
                            status: 0,
                            message: 'ok',
                            phones: instance
                        });
                    }else{
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                });
            }else{
                return res.send({
                    status: 1,
                    message: 'no phone found',
                });
            }
        
        });
    },

    disablePhone: (req, res) => {
        let id = req.body._id;

        db.Phone.getPhoneByPhoneId(id, (err, instance) => {
            if (instance) {
                db.Phone.disablePhone(instance, (err, instance) => {
                    if(instance){
                        return res.send({
                            status: 0,
                            message: 'ok',
                            phones: instance
                        });
                    }else{
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                });
            }else{
                return res.send({
                    status: 1,
                    message: 'no phone found',
                });
            }
        
        });
    },

    hideComment: (req, res) => {
        let id = req.body._id;
        let index = req.body.index;
        db.Phone.getPhoneByPhoneId(id, (err, instance) => {
            if (instance) {
                db.Phone.hideComment(instance, index, (err, instance) => {
                    if(instance){
                        return res.send({
                            status: 0,
                            message: 'ok',
                            phones: instance
                        });
                    }else{
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                });
            }else{
                return res.send({
                    status: 1,
                    message: 'no phone found',
                });
            }
        
        });
    },

    showComment: (req, res) => {
        let id = req.body._id;
        let index = req.body.index;
        db.Phone.getPhoneByPhoneId(id, (err, instance) => {
            if (instance) {
                db.Phone.showComment(instance, index, (err, instance) => {
                    if(instance){
                        return res.send({
                            status: 0,
                            message: 'ok',
                            phones: instance
                        });
                    }else{
                        return res.send({
                            status: -1,
                            message: 'internal error',
                        });
                    }
                });
            }else{
                return res.send({
                    status: 1,
                    message: 'no phone found',
                });
            }
        
        });
    },




}