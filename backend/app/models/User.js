const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // For email verification upon registration
    activationToken: {
        type: String,
        required: false,
    },
    activationExpireAt: {
        type: Date,
        required: false,
    },
    
});

// Auto delete 
UserSchema.index({ "activationExpireAt": 1 }, { expireAfterSeconds: 0 });

UserSchema.statics.getByEmail = async function (email, cb) {
    return this.findOne({ 
        email: email,
    }).exec(cb);
};

UserSchema.statics.authenticate = async function (email, password, cb) {
    this.findOne({ 
        email: email,
        activationToken: null,  // if an account has this field (i.e. activateToken is not null), it means it's not activated yet.
    }).exec((err, instance) => {
        if (instance) {
            if (bcrypt.compareSync(password, instance.password)) {
                cb(null, instance);
                return;
            }
        }
        cb(err);
    });
};

UserSchema.statics.getActivatedByEmail = async function (email, cb) {
    return this.findOne({ 
        email: email,
        activationToken: null,  // if an account has this field (i.e. activateToken is not null), it means it's not activated yet.
    }).exec(cb);
};

UserSchema.statics.getByEmail = async function (email, cb) {
    return this.findOne({ 
        email: email,
    }).exec(cb);
};

UserSchema.statics.insertInactivated = async function(email, password, firstname, lastname, token, cb) {
    password = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS));
    let user = new this({
        _id: new mongoose.Types.ObjectId(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        activationExpireAt: new Date(new Date().getTime() + 10 * 60 * 1000),  // expires in 10 min
        activationToken: token,
    });
    user.save();
    cb(null, user);
};

UserSchema.statics.getByActivationToken = async function (token, cb) {
    return this.findOne({ 
        activationToken: token,
    }).exec(cb);
}


UserSchema.statics.activate = async function (instance, cb) {
    instance.activationExpireAt = undefined;
    instance.activationToken = undefined;
    instance.save(cb);
}


const User = mongoose.model("User", UserSchema);


module.exports = User;