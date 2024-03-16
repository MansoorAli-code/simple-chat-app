const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Route to handle login and store username in local storage
app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie('username', username); // Store username in cookie
    res.redirect('/send-message');
});

// Route to handle sending messages
app.post('/send-message', (req, res) => {
    const username = req.cookies.username;
    const message = req.body.message;
    const data = `${username}: ${message}\n`;
    fs.appendFileSync('messages.txt', data); // Append message to file
    res.redirect('/send-message');
});

// Route to serve the send message form
app.get('/send-message', (req, res) => {
    res.sendFile(__dirname + '/send-message.html');
});

// Route to serve messages
app.get('/messages', (req, res) => {
    const messages = fs.readFileSync('messages.txt', 'utf8');
    res.send(messages);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
