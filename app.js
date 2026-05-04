require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const { default: mongoose } = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());



// app.use('/', require('./server/routes/main'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/product'))
app.use('/', require('./routes/order'))
app.use('/', require('./routes/cart.api'))

mongoose.connect('mongodb://127.0.0.1:27017/al-maequl').then((result)=> console.log('connected to db'));
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT} `)
});



