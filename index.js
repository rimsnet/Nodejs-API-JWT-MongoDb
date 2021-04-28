const express  = require('express');
const mongoose = require('mongoose');
const app     = express();
const dotenv  = require('dotenv');

//Impoort Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true, useNewUrlParser: true  }, ()=>{
    console.log('connected to DB')
});

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000,()=>console.log('Server Up and Running'));