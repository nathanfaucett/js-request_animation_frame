var environment = require("environment"),
    time = require("time");


var lastTime = 0,
    window = environment.window,
    max = Math.max,

    requestAnimationFrame, cancelAnimationFrame;


requestAnimationFrame = (
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

cancelAnimationFrame = (
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

if (cancelAnimationFrame) {
    requestAnimationFrame.cancel = function(id) {
        return cancelAnimationFrame.call(window, id);
    };
} else {
    requestAnimationFrame.cancel = function(id) {
        return global.clearTimeout(id);
    };
}


module.exports = requestAnimationFrame;
