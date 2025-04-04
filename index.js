require('dotenv').config(); // Load environment variables from .env file

const express = require('express') ;  
const routeFiles = require('./routes/files')
const routeShowFiles = require('./routes/showFile')
const routeDownloadFiles = require('./routes/downloads') ; 
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 8000 ; 

const app = express() ; 
app.use(express.json()) ; 

app.set('views' , path.join(__dirname , '/views')) ; 
app.set('view engine' , 'ejs') ; 

app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;

const connectDB = require('./config/db') ; 
connectDB() ; 

// cors - middleware : 
const corsOptions = {
    orgin: process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions)) ; 


app.use('/' , routeFiles) ; 
app.use('/files' ,routeShowFiles ) ;
app.use('/user-file' ,routeDownloadFiles ) ;


app.listen(port) ; 



