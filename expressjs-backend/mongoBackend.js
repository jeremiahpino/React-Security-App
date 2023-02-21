// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const fs = require("fs");

const express = require('express');
const app = express();
const port = 5001;

// use userFunctions.js file
const userFuns = require('./userFunctions');

const cors = require('cors');

app.use(cors());

app.use(express.json());

// import web tokens
const jwt = require('jsonwebtoken');

// import env
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var (token generated)
process.env.TOKEN_SECRET;

app.get('/', (req, res) => {
    res.send('This is JPs App!');
});

// make a post route to login an existing user
app.post('/account/login', async (req, res) => {

    // get password and username from json object
    uName = req.body.username;
    pWord = req.body.password;

    console.log(uName);
    console.log(pWord);

    // find user if in database
    const result = await userFuns.findExactUser(uName, pWord);
    const token = generateAccessToken({ username: req.body.username });

    console.log("result in login", result);

    if(result.length === 0) {
        
        // failed login
        console.log("fail")
        res.status(500).end();
    }
    else {

        // successful login
        console.log("success login.");

        // send back a token to the frontend
        res.status(201).send(token);
    }

});

app.get('/verifyToken', authenticateToken , async (req, res) => {

    console.log("in verify token fun")

    // passed authenticate token send 201
    res.status(201).send("yes");

});

// make a post route to signup a new user
app.post('/account/signup', async (req, res) => {

    console.log("backend route /signup");
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.phoneNumber);

    console.log(req.body);
    // save user struct
    const userToAdd = req.body;

    // add user by calling addUser function in userFunctions.js
    const savedUser = await userFuns.addUser(userToAdd);

    const token = generateAccessToken({ username: req.body.username });

    //console.log(token);
    
    if (savedUser)
        res.status(201).send(token);
    else
        res.status(500).end();

});

// get all users
app.get('/users', authenticateToken, async (req, res) => {

    // get username of user
    const username = req.query['username'];
    
    // get the password of user
    const password = req.query['job'];

    try {
        
        // call getUsers function in userFunctions.js
        const result = await userFuns.getUsers(username, password);
        res.send({users_list: result});

    } catch (error) {

        // send error message
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
})

// delete user
app.delete('/users/:id', async (req, res) => {

    // get id of user
    const id = req.params['id'];

    const deleteUser = await userFuns.deleteUser(id);

    if(deleteUser) {
        res.status(404).send('Resource not found.');
    }
    else {
        // return status code 204 (delete sucessful)
        res.status(204).end();
    }
})

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

function authenticateToken (req, res, next) {
    
    // Bearer TOKEN (get 2nd element of authHeader)
    const authHeader = req.headers['authorization'];

    console.log("in authenticate token")

    //console.log(authHeader);

    // if we have authHeader return the token portion of the header
    const token = authHeader && authHeader.split(' ')[1];

    console.log("the token:", token);

    // user does not have access
    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        // user does not have access
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    }
    )

}

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });  

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is runing at port ${port}`);
  });

