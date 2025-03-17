require('dotenv').config(); // Load environment variables from .env file

const express = require('express') ;  
const serverless = require('serverless-http');
const routeFiles = require('./routes/files')
const routeShowFiles = require('./routes/showFile')
const routeDownloadFiles = require('./routes/downloads') ; 
const path = require('path')
const port = process.env.PORT || 8000 ; 

const app = express() ; 
app.use(express.json()) ; 

app.set('views' , path.join(__dirname , '/views')) ; 
app.set('view engine' , 'ejs') ; 

app.use('/public', express.static(path.join(__dirname, 'public')));






const PORT = process.env.PORT || 8000;

const connectDB = require('./config/db') ; 
connectDB() ; 


app.use('/' , routeFiles) ; 
app.use('/files' ,routeShowFiles ) ;
app.use('/files' ,routeDownloadFiles ) ;


app.listen(port) ; 



// module.exports = app;
// module.exports.handler = serverless(app);
