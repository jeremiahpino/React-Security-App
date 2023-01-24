const express = require('express');
const app = express();
const port = 5001;

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is JPs App');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   

// list of current users 
const users = {
    users_list : [
        {
            username : "bob",
            password : "noPass"
        }
    ]
}



// make a post route 
app.post('/login', (req, res) => {

    // uName = req.body.username;
    // pWord = req.body.password;

    // if ( ("jpino" === uName) && ("fakePass" === pWord)) {

    // }

    if(req.body.password === "fakePass") {

        res.status(201).end();
    }
    else {
        res.status(404).end();
    }

    

});