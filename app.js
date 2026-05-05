

const morgan = require('morgan');
const express = require('express');
const { default: mongoose } = require('mongoose');


const app = express();


app.use(express.static('public'));


//middleware
app.use(morgan('dev'));
app.use(express.json());


console.log('I am under app');

app.use('/', require('./routes/auth.api'))
app.use('/', require('./routes/product.api'))
app.use('/', require('./routes/order.api'))
app.use('/', require('./routes/cart.api'))
app.use('/', require('./routes/user.api'))

module.exports = app;




