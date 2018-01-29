const assert = require('assert');
const TestUtils = require('../test-utils/test-utils');
const NgxExtract = require('./ngx-extract');
const NgxTsModuleParser = require('../ngx-ts-module-parser/ngx-ts-module-parser');

describe('NgxExtract', function () {
    const DEFAULT_APP_MODULE_PATH = 'C:\\Users\\Mona\\Desktop\\inplace-input\\inplace-input\\src\\app';
    const DEFAULT_MODULE_PARSER = NgxTsModuleParser.fromRoot(DEFAULT_APP_MODULE_PATH);
    const OUTPUT_FODLER = 'C:\\Users\\Mona\\Desktop\\ezo-ngx-extract\\output';

    let ngxExtractDefault = null;
    let pathTools = null;

    beforeEach(function () {

        ngxExtractDefault = NgxExtract.from({
            appModulePath: DEFAULT_APP_MODULE_PATH,
            moduleParser: DEFAULT_MODULE_PARSER
        });

        pathTools = ngxExtractDefault.moduleParser._pathTools;

        if (pathTools.exists(OUTPUT_FODLER)) {
            pathTools.deleteFolderAndContent(OUTPUT_FODLER);
        }
    });

    describe('#from', function () {
        it('should be constructed using builder method', function () {
            assert.notEqual(ngxExtractDefault, null, 'Instance not properly constructed.');
        });

        it('should properly set the appModulePath parameter when using builder method', function () {
            assert.equal(
                ngxExtractDefault.appModulePath,
                DEFAULT_APP_MODULE_PATH,
                `Builder method not setting appModulePath - value: ${ ngxExtractDefault.appModulePath }`);
        });

        it('should properly set the moduleParser parameter when using builder method', function () {
            assert.equal(
                ngxExtractDefault.moduleParser,
                DEFAULT_MODULE_PARSER,
                `Builder method not setting appModulePath - value: ${ ngxExtractDefault.moduleParser }`);
        });
    });

    describe('#extractModule()', function () {
        it('should throw an error if the module is not present', function () {
            assert.throws(() => ngxExtractDefault.extractModule({}), Error, 'Module not found');
        });

        it('should raise an error if the destination path is not provided', function () {
            assert.throws(
                () => ngxExtractDefault.extractModule({fullName: 'inplace-input'}),
                Error,
                'Missing destination path params');
        });

        it('should raise an error if the destination path already exists', function () {
            let outputFolder = 'C:\\Users\\Mona\\Desktop\\ezo-ngx-extract\\output';
            ngxExtractDefault.moduleParser._pathTools.createFolder(outputFolder);

            assert.throws(
                () => ngxExtractDefault.extractModule({
                    fullName: 'inplace-input',
                    destinationFolder: outputFolder
                }),
                Error,
                'Folder already exists');
        });

        it('should have created the output folder after extraction', function () {
            ngxExtractDefault.extractModule({
                fullName: 'inplace-input',
                destinationFolder: OUTPUT_FODLER
            });

            const folderExists = pathTools.exists(OUTPUT_FODLER);
            assert.equal(folderExists, true, 'Output folder was not created.')
        });

        it('should have created the module folder after extraction', function () {
            const moduleName = 'inplace-input';
            ngxExtractDefault.extractModule({
                fullName: moduleName,
                destinationFolder: OUTPUT_FODLER
            });

            const pathToModuleFolder = [OUTPUT_FODLER, moduleName].join(pathTools.sep);
            const folderExists = pathTools.exists(pathToModuleFolder);

            TestUtils.shouldBeTrue(folderExists, 'Module folder was not created.');
        });
    });


});