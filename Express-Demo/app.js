const express = require('express');
const app = express();

// Below line required to parse request body -> req.body.name
app.use(express.json());

// Variable Declarations
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]

// GET Request
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
    //res.send([1, 2, 3, 4]);
});

// GET Request by reading param values
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404);
        res.send(`The Course with the given ID: ${req.params.id} was not found.`);
    } else {
        res.send(course);
    }
    //res.send("Details of Course: " + req.params.id);
});

app.get('/api/date/:month/:year', (req, res) => {
    //res.send(`Details of Date - Month: ${req.params.month}\nYear: ${req.params.year}`);
    res.send(req.params)
    //res.send(req.query); // ?sortBy=ASC -> {"sortBy":"ASC"}
});

// Note: - In request values taken after / are mandatory stuff and that taken in query parameters are optional stuff

// POST Request
app.post('/api/courses', (req, res) => {
    // Validate if name is present
    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('Please provide name with atleast 3 char long.');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// In Hosting Environment Port are assigned dynamically so below code is used
// If env variable is not set than default value is picked which is 3000 in this case
// To set environment variable use below commands
// Mac - export PORT = 5000, windows - export PORT = 5000 on terminal
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));