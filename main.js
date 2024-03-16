const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/send-message', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'send-message.html'));
});

app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact-us.html'));
});

app.post('/success', (req, res) => {
    // Process form submission here
    res.redirect('/success');
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

// 404 Route
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
