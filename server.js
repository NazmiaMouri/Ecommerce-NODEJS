require('dotenv').config();
const { default: mongoose } = require('mongoose');
const express = require('express');
const  app  = require('./app');

const PORT = process.env.PORT || 5000;

console.log('I am under server');

mongoose.connect('mongodb://127.0.0.1:27017/al-maequl').then((result)=> console.log('connected to db'));
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT} `)
});


