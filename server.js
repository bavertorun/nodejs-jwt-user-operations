require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); 
const db = require('./db_connection'); 
const PORT = 3000 || process.env.PORT;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db();

app.use('/api/auth/',require('./routes/user'));

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});
