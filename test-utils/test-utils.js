const assert = require('assert');

function assertFail(baseMessage, actual, expected) {
    return `${baseMessage} [Actual: <${actual}> - Expected: <${expected}>]`;
}

const TestUtils = {
    shouldBeFalse(actual, baseMessage) {
        this.shouldBeEqual(actual, false, baseMessage);
    },

    shouldBeTrue(actual, baseMessage) {
        this.shouldBeEqual(actual, true, baseMessage);
    },

    shouldBeEqual(actual, expected, baseMessage) {
        assert.equal(actual, expected, assertFail(baseMessage, actual, expected));
    },

    shouldNotBeNull(actual, baseMessage) {
        this.shouldNotBeEqual(actual, null, baseMessage);
    },

    shouldNotBeEqual(actual, expected, baseMessage) {
        assert.notEqual(actual, expected, assertFail(baseMessage, actual, expected));
    }
};

module.exports = TestUtils;