var analytics = require("analytics-node");

module.exports = function() {
    analytics.init({
        secret: "d8y02t19379llwnja30c",
        flushAt: 1
    });
};