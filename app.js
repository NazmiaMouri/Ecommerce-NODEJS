require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { default: mongoose } = require('mongoose');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static('public'));


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());



app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/auth'))
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/al-maequl').then((result)=> console.log('connected to db'));
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT} `)
});



