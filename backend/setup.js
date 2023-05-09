const USER_DATASET = "./data/datasets/userlist.json";

const mongoose = require("mongoose");

var usersRaw = require(USER_DATASET);
const User = require("./app/models/User");

var userInstances = [];
usersRaw.forEach(user => {
    userInstances.push(new User({
        _id: mongoose.Types.ObjectId(user._id.$oid),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
    }));
});

mongoose.connect("mongodb://localhost:27017/COMP5347",{
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
                mongoose.disconnect();
            })
            
        });
    }
});
