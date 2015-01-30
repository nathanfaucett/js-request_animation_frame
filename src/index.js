var environment = require("environment"),
    time = require("time");


var window = environment.window,

    nativeRequestAnimationFrame = (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame
    ),

    nativeCancelAnimationFrame = (
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
    ),

    requestAnimationFrame, lastTime, max;


if (nativeRequestAnimationFrame) {
    requestAnimationFrame = function requestAnimationFrame(callback, element) {
        return nativeRequestAnimationFrame.call(window, callback, element);
    };
} else {
    max = Math.max;
    lastTime = 0;

    requestAnimationFrame = function requestAnimationFrame(callback) {
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
    };
}


if (nativeCancelAnimationFrame) {
    requestAnimationFrame.cancel = function(id) {
        return nativeCancelAnimationFrame.call(window, id);
    };
} else {
    requestAnimationFrame.cancel = function(id) {
        return global.clearTimeout(id);
    };
}


requestAnimationFrame(function noop() {});


module.exports = requestAnimationFrame;
