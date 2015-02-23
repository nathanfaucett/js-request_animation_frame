var assert = require("assert"),
    requestAnimationFrame = require("../src/index");


describe("requestAnimationFrame(callback, element)", function() {
    it("should request an animation frame", function(done) {
        requestAnimationFrame(function(ms) {
            assert.equal(typeof(ms), "number");
            done();
        });
    });
});
