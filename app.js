"use strict";
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
var authController = require("./auth/AuthController");
var mongoose = require('mongoose');

app.get('/api', function(req,res){

// mongoose.set()
mongoose.connect('mongodb+srv://hrcloud:hr@123@cluster0.icwl5.mongodb.net/hrcloud?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology:true},function(err,db){
    if(err)
    console.log(err)
console.log(db)
});

    // res.status(200).send({
    //     statusCode:200,
    //     message:'Your server is up and running'
    // })
})

app.use("/api/auth", authController);

app.use(function(req,res,next){
    next(createError(404))
})
app.use(function (err, req,res,next){
    res.locals.message = err.message
    res.status(err.status || 500)
    res.json({error:err})
})

module.exports = app;