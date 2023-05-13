const USER_DATASET = "./data/datasets/userlist.json";
const PHONELIST_DATASET = "./data/datasets/phonelisting.json";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 8;

var usersRaw = require(USER_DATASET);
var phoneList = require(PHONELIST_DATASET);
const User = require("./app/models/User");
const Phone = require("./app/models/Phone");

var userInstances = [];
var password = bcrypt.hashSync("Password.", saltRounds);  // Default password for all initial users
usersRaw.forEach(user => {
    userInstances.push(new User({
        _id: mongoose.Types.ObjectId(user._id.$oid),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: password,
    }));
});

var phoneInstances = [];
phoneList.forEach(phone => {
    phoneInstances.push(new Phone({
        _id: mongoose.Types.ObjectId(phone._id.$oid),
        title: phone.title,
        brand: phone.brand,
        image: phone.image,
        stock: phone.stock,
        seller: phone.seller,
        price: phone.price,
        reviews: phone.reviews,
        disabled: phone.disabled,
    }));
});

mongoose.connect("mongodb://127.0.0.1:27017/COMP5349",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
},(err) => {
    if (err){
        console.log(err);
    }else{
        mongoose.connection.db.dropDatabase().then(() => {
            console.log("Database cleared.");
            User.insertMany(userInstances).then(() => {
                console.log("Users created.");
            })
            Phone.insertMany(phoneInstances).then(() => {
                console.log("Phones created.");
                mongoose.disconnect();
            })
            
        });
    }
});
