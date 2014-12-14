var time = require("time");


var lastTime = 0,
    max = Math.max,
    setTimeout = global.setTimeout,

    requestAnimationFrame, cancelAnimationFrame;


requestAnimationFrame = (
    global.requestAnimationFrame ||
    global.webkitRequestAnimationFrame ||
    global.mozRequestAnimationFrame ||
    global.oRequestAnimationFrame ||
    global.msRequestAnimationFrame ||
    function requestAnimationFrame(callback) {
        var current = time.now(),
            timeToCall = max(0, 16 - (current - lastTime)),
            id = setTimeout(
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
    global.cancelAnimationFrame ||
    global.cancelRequestAnimationFrame ||

    global.webkitCancelAnimationFrame ||
    global.webkitCancelRequestAnimationFrame ||

    global.mozCancelAnimationFrame ||
    global.mozCancelRequestAnimationFrame ||

    global.oCancelAnimationFrame ||
    global.oCancelRequestAnimationFrame ||

    global.msCancelAnimationFrame ||
    global.msCancelRequestAnimationFrame ||

    global.clearTimeout
);

requestAnimationFrame.cancel = function(id) {

    return cancelAnimationFrame.call(global, id);
};


module.exports = requestAnimationFrame;
