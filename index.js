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
const { v4: uuidv4 } = require('uuid'); //uuidv4() is a function which will give random unique string IDs
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
let posts = [
    {
        id: '1a',
        user: "Aaditya",
        content: "I love coding!"
    },
    {
        id: '2b',
        user: "Swechha",
        content: "I love web development!"
    },
    {
        id: '3c',
        user: "Sus",
        content: "I love working hard!"
    },
    {
        id : '4d',
        user: "Suraj",
        content: "I hate coding!"
    }
];

//lets create paths
app.get('/', (req, res) => {
    res.send('Server successfully loaded!');
});

/**
 * Exact VS Dynamic Routes
 * Exact route - which does not contain any path parameters (/path:id -> here id is path parameter) -> /posts is exact route
 * Dynamic route - which does contain path parameters (/path:id is dynamic routes)
 */

//path to get the data of all the posts - an array of the post is simulated as database which we will be exploring later
app.get('/posts', (req, res) => {
    res.render('index', {posts});
})

/**
 * This code below will cause an error when you send request to posts/new because When you make a GET request to '/posts/new', 
 * Express will see if it matches the first route ('/posts')? No. Next route is '/posts/:id' — yes, because :id can be 'new'. So 
 * Express will use that route instead of the '/posts/new' route. That’s exactly why you see the "Incorrect id - no post available for this id." message.
 */

/**
 * Such conflict only occurs for dynamic routes not for exact routes
 */

// app.get('/posts/:id', (req, res) => {
//     let {id} = req.params;
//     let idPost = posts.find(post => id === post.id);
//     if(!idPost) {
//         res.send('Incorrect id - no post available for this id.')
//     }
//     res.render('individualpost', {idPost});
// });

// app.get('/posts/new', (req, res) => {
//     res.render('newPost.ejs');
//     console.log(res.body);
// })

/**
 * Trick to avoid this is to create the more specific routes first - here posts/new is more specific than posts/:id since id can be anything - so always
 * create the specific routes first - this will avoid the error which was caused before
 */

//path to create a new post - user will fill up a form
app.get('/posts/new', (req, res) => {
    res.render('newPost.ejs');
})

app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    let idPost = posts.find(post => id === post.id); //url parameter is always a string (id in this case is a string so make sure post.id is string for every post)
    console.log(idPost);
    if(!idPost) {
        res.send('Incorrect id - no post available for this id.')
    }
    res.render('individualpost', {idPost});
});

//this is the api that is called when clicked submit button on the form of new post
app.post('/posts', (req, res) => {
    let postInfo = req.body;
    //but this method of creating IDs for new posts is very inefficient and may cause erros 
    //we can use UUID - Universally Unique Identifier package which generates unique string IDs
    //lets require this package - in the first few lines of code
    //postInfo.id = String(Math.floor(Math.random()*6)); the url parameter is always a string so better convert the id into a string 
    postInfo.id = uuidv4(); //this will give a random string id which which always be unique
    console.log(postInfo);
    posts.push(postInfo);
    console.log('Successfully added post.');
    res.redirect('/posts');
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});

//so how can we connect these different routes/pages
//for example - when a new post is submitted - it should directly go to the posts page
//to do that we can use redirect function of RESPONSE 
//res.redirect(URL);