"strict mode"

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { response } = require("express");

//load .env configs into process.
require("dotenv").config(); 


const app = express();

//If PORT is defined, use process PORT, ELSE, use 5000;
const port = process.env.PORT || 5000;


//Parsing middleware
//Parse application/x-www-form-urencoded
app.use(bodyParser.urlencoded({extended: false }));

//Parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static('public'));

//Template Engine
app.engine('hbs', exphbs.engine({defaultLayout:'main', extname:'.hbs'}));
app.set('view engine', 'hbs');


const routes = require('./server/routes/user');
app.use('/',routes);

const localhost = "127.0.0.1";
app.listen(port, localhost, ()=> console.log(`Listening on http://${localhost}:${port}`));

