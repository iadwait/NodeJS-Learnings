console.log('Network Manager');

const port = 3000

const http = require('http');
// This Class Inherits from Event Emitter
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }

    if (req.url === "/api/users") {
        res.write('User Names');
        res.write(JSON.stringify(["Adwait", "Vikrant", "Prasad"]));
        res.end();
    }
});

server.listen(port);

console.log(`Listening on Port: ${port}`);

