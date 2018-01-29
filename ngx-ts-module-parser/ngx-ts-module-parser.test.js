const assert = require('assert');
const TestUtils = require('../test-utils/test-utils');
const Path = require('path');
const NgxTsModuleParser = require('./ngx-ts-module-parser');
const MockFS = require('../test-utils/mock-fs');

describe('NgxTsModuleParser', function () {
    const VALID_CHILD_MODULE_FULL_NAME = 'inplace-input';

    const SOURCE_ROOT = 'C:\\Users\\Mona\\Desktop\\inplace-input\\inplace-input';
    const DUMMY_SOURCE_PATH = `${SOURCE_ROOT}\\src`;
    const DEFAULT_VALID_PATH = `${DUMMY_SOURCE_PATH}\\app`;
    const DEFAULT_INVALID_PATH = `${DUMMY_SOURCE_PATH}\\app2`;

    const APP_MODULE_PATH = [DEFAULT_VALID_PATH, 'app.module.ts'].join(Path.sep);
    const VALID_CHILD_MODULE_PATH = [DEFAULT_VALID_PATH, VALID_CHILD_MODULE_FULL_NAME].join(Path.sep);
    const VALID_CHILD_MODULE_TS_PATH = [VALID_CHILD_MODULE_PATH, `${VALID_CHILD_MODULE_FULL_NAME}.module.ts`].join(Path.sep);
    const APP_MODULE_CONTENT = 'import {NgModule} from "@angular/core"; @NgModule({}) export class AppModule {}';
    const DUMMY_CHILD_MODULE_CONTENT = 'import {NgModule} from "@angular/core"; @NgModule({}) export class DummyChildModule {}';

    const EXTRACT_MODULE_INVALID_PARAMS = {
        fullName: 'module-name',
        destinationFolder: 'C:\\Users\\Mona\\Desktop\\inplace-input\\extracted'
    };

    const EXTRACT_MODULE_VALID_PARAMS = {
        fullName: VALID_CHILD_MODULE_FULL_NAME,
        destinationFolder: 'C:\\Users\\Mona\\Desktop\\inplace-input\\extracted'
    };

    const mockFs = new MockFS();
    mockFs.existsSyncShouldReturnIf(true, [
        DEFAULT_VALID_PATH,
        APP_MODULE_PATH,
        VALID_CHILD_MODULE_PATH,
        VALID_CHILD_MODULE_TS_PATH
    ]);

    mockFs.setFileContent(APP_MODULE_PATH, APP_MODULE_CONTENT);
    mockFs.setFileContent(VALID_CHILD_MODULE_TS_PATH, DUMMY_CHILD_MODULE_CONTENT);

    const DEFAULT_PARSER = NgxTsModuleParser.fromRoot(DEFAULT_VALID_PATH, mockFs);
    const DEFAULT_INVALID_PARSER = NgxTsModuleParser.fromRoot(DEFAULT_INVALID_PATH, mockFs);

    let parser = null;
    let invalidParser = null;

    beforeEach(function () {
        parser = DEFAULT_PARSER;
        invalidParser = DEFAULT_INVALID_PARSER;
    });

    describe('#fromRoot()', function () {
        it('should build an instance when calling the builder method', function () {
            TestUtils.shouldNotBeNull(parser, 'Builder method not constructing properly');
        });

        it('should have set the path attribute when using the builder method', function () {
            TestUtils.shouldBeEqual(parser.path, DEFAULT_VALID_PATH, 'Path not properly set.');
        });
    });

    describe('#isPathValid()', function () {
        it('should return true if the path provided points to an existing file', function () {
            TestUtils.shouldBeTrue(parser.isPathValid(), 'Invalid path provided');
        });

        it('should return false if the path provided does not point to an existing file', function () {
            TestUtils.shouldBeFalse(invalidParser.isPathValid(), 'Invalid path provided');
        });
    });

    describe('#isAngularModule()', function () {
        it('should return true if path points to a file containing the @NgModule annotation', function () {
            TestUtils.shouldBeTrue(parser.isAngularModule(parser._moduleClassPath), 'Invalid path provided.');
        });

        it('should return false if the path provided points to a file which does not contain the @NgModule annotation', function () {
            TestUtils.shouldBeFalse(invalidParser.isAngularModule(invalidParser._moduleClassPath), 'Invalid path provided.');
        });
    });


    describe('#getChildModulePath()', function () {
        it('should return a path constructed using the app module path and the full name of the module', function () {
            const childModuilePath = parser.getChildModulePath(VALID_CHILD_MODULE_FULL_NAME);
            TestUtils.shouldBeEqual(
                childModuilePath,
                VALID_CHILD_MODULE_TS_PATH,
                'Path with single level deep full name invalid');
        });
    });

    describe('#childModuleExists()', function () {
        it('should return true if only a name is passed and the module exists', function () {
            const exists = parser.childModuleExists(VALID_CHILD_MODULE_FULL_NAME);
            TestUtils.shouldBeTrue(exists, 'Child module not found were expected');
        });

        it('should return false if only the name does not exists', function () {
            TestUtils.shouldBeFalse(parser.childModuleExists('module-name'), 'Child module not found were expected');
        });
    });

});
