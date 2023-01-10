
// Use const while importing modules to avoid making any other assignment in code
const logger = require('./logger');
const path = require('path'); // Inbuild Module
var objPath = path.parse(__filename);
const fs = require('fs');
const os = require('os');
const Logger = logger.Logger
const objLogger = new Logger();
// Here EventEmitter is a Class
const EventEmitter = require('events');
const event = new EventEmitter()

function sayHello(name) {
    console.log("Hello " + name + "!");
}

logger.addSeperator();
logger.debugLog("Genral Debugs");
//sayHello("Adwait");
logger.debugLog("Adwait");
//logger.debugLog(logger); // Check what all things are exported from Logger Module
//console.log(logger); 
logger.debugLog("Base UR: " + logger.baseURL);
//console.log("Base UR: " + logger.baseURL); 

logger.addSeperator();
logger.debugLog("File and Directory Paths");
logger.debugLog("FileName: " + __filename);
logger.debugLog("Directory Name: " + __dirname);

// Path Module
logger.addSeperator();
logger.debugLog("Path Module");
logger.debugLog(objPath);

// OS Module
logger.addSeperator();
logger.debugLog("OS Module");
let totalMemory = os.totalmem()
let freeMemory = os.freemem()
logger.debugLog(`Total Memory: ${totalMemory}`);
logger.debugLog(`Free Memory: ${freeMemory}`);

// File System Module
logger.addSeperator();
logger.debugLog("File System Module");
// Sync Operation
//var files = fs.readdirSync('./');
//logger.debugLog(files);

// Async Operation
var files = fs.readdir('./',function(err, files) {
    if (err) {
        logger.debugLog(`Error: ${err}`);
    } else {
        logger.debugLog(`Files: ${files}`);
    }
});

// Register a Listner
logger.addSeperator();
logger.debugLog("Events: \nRegister and Trigger an Event:");
event.on('myEvent', function() {
    logger.debugLog("Event Triggered");
});
logger.debugLog("Event Registered");
// Raise an event
event.emit('myEvent');

// Event Arguments
event.on('userLogin', (userDetails) => {
    logger.debugLog(`User Logged In: \nID: ${userDetails.id}, Username: ${userDetails.userName}`);
});
//event.emit('userLogin', {id: 1, userName: "Adwait"});

// Raise Event from different Module
logger.addSeperator();
logger.debugLog('Raise Event from Different Module');
objLogger.on('logEvent', (arg) => {
    logger.debugLog(arg);
});

objLogger.log("Log my event");

logger.addSeperator();