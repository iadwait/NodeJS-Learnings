const express = require('express');
const Joi = require('joi');
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

    // Manual Validations
    if (!req.body.name || req.body.name.length < 3) {
        // 400 - Bad Request
        res.status(400).send('Please provide name with atleast 3 char long.');
        return;
    }

    // TODO: - To be debugged. Facing Error
    // Validations with Joi
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body);
    // console.log(result);

    // if (result.error) {
    //     // 400 - Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// PUT Request [Update Course Details]
app.put('/api/courses/:id', (req,res) => {
    // Check if Coourse Exists Else Through 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404);
        res.send(`The Course with the given ID: ${req.params.id} was not found.`);
        return;
    }
    // Check if Updation Values are Correct Else through 400
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Please provide name with atleast 3 char long.');
        return;
    }
    // Update the Course and return the result
    course.name = req.body.name
    res.send(course);
});

// In Hosting Environment Port are assigned dynamically so below code is used
// If env variable is not set than default value is picked which is 3000 in this case
// To set environment variable use below commands
// Mac - export PORT = 5000, windows - export PORT = 5000 on terminal
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));