const express = require('express');

require('./models/db');

const app = express();

const routes = require('./router');

const path = require('path');

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.get('/',routes);

//Register User
app.post('/register',routes);

app.get('/login',routes);
app.post('/login',routes);
app.get('/dashboard',routes);
app.get('/leaseAgreement',routes);
app.get('/logout',routes);
app.get('/twopeople',routes);
app.get('/threepeople',routes);
app.get('/fourpeople',routes);
app.get('/aboutUs',routes);
app.get('/successPage',routes);

 const PORT = process.env.PORT || 7000;

 app.listen(PORT,()=>console.log("server is listening at port".PORT));