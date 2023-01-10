const EventEmitter = require('events');

var endPoint = "https://www.google.com";

function debugLog(message) {
    console.log(message)
}

function addSeperator() {
    console.log("-------------------------");
}

// Export Function to be reused in other files
module.exports.debugLog = debugLog;
module.exports.addSeperator = addSeperator;
// Usage
//var logger = require('./logger');
//logger.debugLog("Adwait");
module.exports.baseURL = endPoint;

// In order to export only 1 item
//module.exports = debugLog
//Usage:-
//const logger = require('./logger');
//logger("Adwait")

class Logger extends EventEmitter {

    log(message) {
        console.log("Logging Event");
        this.emit('logEvent', {message})
        console.log("Event Logged");
    }

}

module.exports.Logger = Logger