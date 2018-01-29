const assert = require('assert');
const MockFs = require('../test-utils/mock-fs');
const TestUtils = require('../test-utils/test-utils');
const PathTools = require('../path-tools/path-tools');
const NpmPackageBuilder = require('../npm-package-builder/npm-package-builder');

describe('NpmPackageBuilder', function () {
    const VALID_PACKAGE_ROOT = 'C:\\Users\\Mona\\Desktop\\ezo-ngx-extract\\output\\inplace-input';
    const VALID_NPM_PACKAGE_FILE_PATH = `${VALID_PACKAGE_ROOT}\\package.json`;
    let builder = null;

    const fs = new MockFs();

    beforeEach(function () {
        builder = new NpmPackageBuilder(new PathTools());
    });

    describe('#buildPackageJsonPath()', function () {
        it('should build the path based on a root by adding package.json to it', function () {
            let path = builder.buildPackageJsonPath('C:\\Users\\Mona\\Desktop\\ezo-ngx-extract\\output\\inplace-input');
            TestUtils.shouldBeEqual(path, VALID_NPM_PACKAGE_FILE_PATH, 'Invalid file path.');
        });
    });

    describe('#create()', function () {
        it('should create the file', function () {
            builder.createPackageJson(VALID_PACKAGE_ROOT, {
                "name": "output",
                "description": "Dummy",
                "author": "Ezo",
                "license": "ISC"
            });

            TestUtils.shouldBeTrue(builder._pathTools.exists(VALID_NPM_PACKAGE_FILE_PATH), 'File was not created.');
        });
    });
});