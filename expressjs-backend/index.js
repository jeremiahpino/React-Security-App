const express = require('express');
const app = express();
const port = 5001;

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is JPs App!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   

// list of current users 
const users = {
    users_list : [
        {
            username : "jpino",
            password : "fakepass"
        }
    ]
}

// make a post route 
app.post('/login', (req, res) => {

    // get password and username from json object
    uName = req.body.username;
    pWord = req.body.password;

    if( (uName === "jpino") && (pWord === "fakepass") ) {

        console.log("success");

        // sucessful login
        res.status(201).send().end();

    }
    else {

        // failed login
        console.log("fail")

        res.status(404).send("Resource not found.").end();
    }

});