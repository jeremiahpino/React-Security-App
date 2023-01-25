
const express = require('express');
const app = express();
const port = 5001;

const cors = require('cors');

app.use(cors());

app.use(express.json());

const lToken = '2342f2f1d131rf12';
const rToken = '6343j2fwc1marf92';

app.get('/', (req, res) => {
    res.send('This is JPs App!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   

// list of current users 
const users = {
    users_list : 
    [
        {
            username : "jpino",
            password : "Jeremiah@1"
        },
        {
            username : "dpino",
            password : "Dominic@1"
        }
    ]
}

// make a post route 
app.post('/account/login', (req, res) => {

    // get password and username from json object
    uName = req.body.username;
    pWord = req.body.password;

    if( (uName === "jpino") && (pWord === "Jeremiah@1") ) {

        console.log("success");

        // send back a token to the frontend
        res.status(201).send(lToken).end();

    }
    else {

        // failed login
        console.log("fail")

        res.status(404).send("Resource not found.").end();
    }

});

// make a post route 
app.post('/account/signup', (req, res) => {

    // get password and username from json object
    uName = req.body.username;
    pWord = req.body.password;

    // save user struct
    const userToAdd = req.body;

    // add user
    addUser(userToAdd);

    // sucessful login
    res.status(201).send(rToken).end();

});

// get all users
app.get('/users', (req, res) => {



})

// get user by username

function addUser(user) {
    users['users_list'].push(user);
}