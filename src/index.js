var environment = require("environment"),
    time = require("time");


var lastTime = 0,
    window = environment.window,
    max = Math.max;


module.exports = requestAnimationFrame;


window.requestAnimationFrame = (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function requestAnimationFrame(callback) {
        var current = time.now(),
            timeToCall = max(0, 16 - (current - lastTime)),
            id = global.setTimeout(
                function runCallback() {
                    callback(current + timeToCall);
                },
                timeToCall
            );

        lastTime = current + timeToCall;
        return id;
    }
);

window.cancelAnimationFrame = (
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

function requestAnimationFrame(callback, element) {

    return window.requestAnimationFrame(callback, element);
}

if (window.cancelAnimationFrame) {
    requestAnimationFrame.cancel = function(id) {
        return window.cancelAnimationFrame(id);
    };
} else {
    requestAnimationFrame.cancel = function(id) {
        return global.clearTimeout(id);
    };
}


module.exports = requestAnimationFrame;
