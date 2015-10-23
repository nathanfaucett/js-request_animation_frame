var environment = require("environment"),
    emptyFunction = require("empty_function"),
    now = require("now");


var window = environment.window,
    requestAnimationFrame, lastTime;


window.requestAnimationFrame = (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame
);

window.cancelRequestAnimationFrame = (
    window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||

    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||

    window.mozCancelAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||

    window.oCancelAnimationFrame ||
    window.oCancelRequestAnimationFrame ||

    window.msCancelAnimationFrame ||
    window.msCancelRequestAnimationFrame
);


if (window.requestAnimationFrame) {
    requestAnimationFrame = function requestAnimationFrame(callback, element) {
        return window.requestAnimationFrame(callback, element);
    };
} else {
    lastTime = 0;

    requestAnimationFrame = function requestAnimationFrame(callback) {
        var current = now(),
            timeToCall = Math.max(0, 16 - (current - lastTime)),
            id = global.setTimeout(
                function runCallback() {
                    callback(current + timeToCall);
                },
                timeToCall
            );

        lastTime = current + timeToCall;
        return id;
    };
}


if (window.cancelRequestAnimationFrame && window.requestAnimationFrame) {
    requestAnimationFrame.cancel = function(id) {
        return window.cancelRequestAnimationFrame(id);
    };
} else {
    requestAnimationFrame.cancel = function(id) {
        return global.clearTimeout(id);
    };
}


requestAnimationFrame(emptyFunction);


module.exports = requestAnimationFrame;
