/*
** utils.js
** Developed 10-06-2017, David Bird.
** Logging and text utility javascript library.
*/

var Utils = (function () {
    // Set to true during development, false thereafter.
    var loggingActive = false;
    var loggingOn = function () {
        loggingActive = true;
    };
    var loggingOff = function () {
        loggingActive = false;
    };
    var log = function (message) {
        if (loggingActive) console.log(message);
    };
    var logAlways = function (message) {
        console.log(message);
    };
    // Text helper function
    var textBetween = function (haystack, needleA, needleB) {
        return haystack.split(needleA)[1].split(needleB)[0];
    };

    return {
        loggingOn: loggingOn,
        loggingOff: loggingOff,
        log: function (message) { log(message); },
        logAlways: function (message) { logAlways(message); },

        textBetween: function (haystack, needleA, needleB) { return textBetween(haystack, needleA, needleB); },
    };
})();