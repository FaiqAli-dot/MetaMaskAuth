const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = {};

app.post('/register', (req, res) => {
    const { account } = req.body;

    if (users[account]) {
        return res.status(400).send('Account already registered');
    }

    users[account] = {
        account,
        // Add other user details if needed
    };

    res.send('Registration successful');
});

app.post('/login', (req, res) => {
    const { account } = req.body;

    if (!users[account]) {
        return res.status(400).send('Account not found');
    }

    res.send('Login successful');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
