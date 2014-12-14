var requestAnimationFrame = require("../src/index");


var requestId;


(function loop(ms) {
    console.log(ms);
    requestId = requestAnimationFrame(loop);
}(0));

setTimeout(function() {

    requestAnimationFrame.cancel(requestId);
}, 1000);
