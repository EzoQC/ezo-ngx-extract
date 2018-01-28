class MockFS {

    existsSync(path) {
        let returnedValue = this.existsSyncReturnIfValue;

        if (path !== this.existsSyncReturnIfPath) {
            returnedValue = !returnedValue;
        }

        return returnedValue;
    }

    existsSyncShouldReturnIf(value, trueValue) {
        this.existsSyncReturnIfPath = trueValue;
        this.existsSyncReturnIfValue = value;
    }
}

module.exports = MockFS;