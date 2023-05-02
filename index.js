const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://localhost:27017/COMP5347",{
    useNewUrlParser:true
},(err) => {
    if (err){
        console.log(err);
    }else{
        console.log("Successfully connected!")
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
})