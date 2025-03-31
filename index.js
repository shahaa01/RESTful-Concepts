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
 * 
 * We are going to develop a basic QUORA clone
 * so the resource for our CRUD operations is : POSTS of the user
 * EndPoints should also be a noun and not a verb
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
//to also parse form data - for post request to parse data in the body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//lets set the static files path
app.use(express.static(path.join(__dirname, 'public')));

//simulating database - which stores the posts
let arr = [
    {
        user: "Aaditya",
        content: "I love coding!"
    },
    {
        user: "Swechha",
        content: "I love web development!"
    },
    {
        user: "Sus",
        content: "I love working hard!"
    },
    {
        user: "Suraj",
        content: "I hate coding!"
    }
];

//lets create paths
app.get('/', (req, res) => {
    res.send('Server successfully loaded!');
});

//path to get the data of all the posts - an array of the post is simulated as database which we will be exploring later
app.get('/posts', (req, res) => {
    let posts = {post: arr};
    res.render('index', {posts});
})


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});