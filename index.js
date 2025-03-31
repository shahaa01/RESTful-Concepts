/**REST - REpresentational State Transfer 
 * Its a principle or a set of rules which is used for web services
 * like sending request, processing it and sending back the response
 * 
 * CRUD Operations :- Create, Read, Update & Delete
 * These are also called HTTPS methods:
 * GET - retrieves response
 * POST - submits new data in the server
 * UPDATE - updates the existing data in the server
 * PATCH - updates existing data partially
 * DELETE -  removes the data from the server
 */

//lets create a server first

const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;


//lets set view engine to ejs 
app.set('view engine', 'ejs');

//lets set the path for the views directory to access ejs files
app.set('views', path.join(__dirname, 'views'));

//lets set it in a way that it can parse json data - uses middleware - express.josn();
app.use(express.json());

//lets set the static files path
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});