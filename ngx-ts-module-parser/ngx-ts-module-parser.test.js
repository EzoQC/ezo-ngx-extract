const assert = require('assert');
const NgxTsModuleParser = require('./ngx-ts-module-parser');
const MockFS = require('./mock-fs');

describe('NgxTsModuleParser', function () {
    const DEFAULT_VALID_PATH = 'C:\\Users\\Mona\\Desktop\\inplace-input\\inplace-input\\src\\app';
    const DEFAULT_INVALID_PATH = 'C:\\Users\\Mona\\Desktop\\inplace-input\\inplace-input\\src\\app2';

    const mockFs = new MockFS();
    mockFs.existsSyncShouldReturnIf(true, DEFAULT_VALID_PATH);

    const DEFAULT_PARSER = NgxTsModuleParser.fromRoot(DEFAULT_VALID_PATH);
    const DEFAULT_INVALID_PARSER = NgxTsModuleParser.fromRoot(DEFAULT_INVALID_PATH);

    let parser = null;
    let invalidParser = null;

    beforeEach(function () {
        parser = DEFAULT_PARSER;
        invalidParser = DEFAULT_INVALID_PARSER;
    });

    describe('#fromRoot()', function () {
        it('should build an instance when calling the builder method', function () {
            assert.notEqual(
                parser,
                null,
                'Builder method not constructing properly');
        });

        it('should have set the path attribute when using the builder method', function () {
            assert.equal(parser.path, DEFAULT_VALID_PATH, 'Path not properly set.');
        });
    });

    describe('#isPathValid()', function () {
        it('should return true if the path provided points to an existing file', function () {
            assert.equal(parser.isPathValid(), true, 'Invalid path provided.');
        });

        it('should return false if the path provided does not point to an existing file', function () {
            assert.equal(invalidParser.isPathValid(), false, 'Invalid path provided.');
        });
    });

    describe('#isAngularModule()', function () {
        it('should return true if path points to a file containing the @NgModule annotation', function () {
            assert.equal(parser.isAngularModule(), true, 'Invalid path provided.');
        });

        it('should return false if the path provided points to a file which does not contain the @NgModule annotation', function () {
            assert.equal(invalidParser.isAngularModule(), false, 'Invalid path provided.');
        });
    })

});