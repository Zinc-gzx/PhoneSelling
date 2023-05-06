const express = require('express');
const mongoose = require('mongoose');
const routes = require('./app/routes');
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/COMP5347",{
    useNewUrlParser:true
},(err) => {
    if (err){
        console.log(err);
    }else{
        console.log("Successfully connected!")
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log('Server listening on port 3000!');
})