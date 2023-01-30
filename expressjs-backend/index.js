
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

    // find user if in database
    const result = findUserByPasswordAndUsername(uName, pWord);

    console.log(result);
    console.log(result[0].username);
    console.log(result[0].password);

    if( (uName === result[0].username) && (pWord === result[0].password) ) {

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

    allUsers = getAllUsers();

    const username = req.query['username'];
    let result = findUserByUsername(username);

    // error checking 
    if (allUsers === undefined || allUsers.length == 0) {
        res.status(404).send('Resource not found.');
    }
    // error checking 
    if (result === undefined || result.length == 0)
         
        // return all users
         res.status(201).send(allUsers).end();

    else {
        mresult = {users_list : result}
        // return specific user
        res.send(mresult).end();
    }

})

function addUser(user) {
    users['users_list'].push(user);
}

function findUserByUsername(uname) {
    return users['users_list'].filter( (user) => user['username'] === uname);
}

function findUserByPassword(pword) {
    return users['users_list'].filter( (user) => user['password'] === pword);
}

function findUserByPasswordAndUsername(uname, pword) {
    return users['users_list'].filter( (user) => (user['username'] === uname) && (user['password'] === pword) )
}

function getAllUsers() {
    return users['users_list'];
}