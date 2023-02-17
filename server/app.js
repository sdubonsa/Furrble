const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express(); 

let port = 3000;
let host = 'localhost';

//add styles template within the view folder
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));



//start the server 
app.listen(port, host, ()=> {
    console.log('Server is running on port', port);
})