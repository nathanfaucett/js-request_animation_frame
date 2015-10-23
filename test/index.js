var tape = require("tape"),
    requestAnimationFrame = require("..");


tape("requestAnimationFrame(callback, element)", function(assert) {
    var called = false;

    requestAnimationFrame(function( /* ms */ ) {
        called = true;
        assert.equal(called, true, "should request an animation frame");
        assert.end();
    });
    assert.equal(called, false, "should request an animation frame");
});
