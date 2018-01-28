const assert = require('assert');
const NgxExtract = require('./ngx-extract');
const NgxTsModuleParser = require('../ngx-ts-module-parser/ngx-ts-module-parser');

describe('NgxExtract', function () {
    const DEFAULT_APP_MODULE_PATH = 'C:\\Users\\Mona\\Desktop\\inplace-input\\inplace-input\\src\\app';
    const DEFAULT_MODULE_PARSER = new NgxTsModuleParser();

    let ngxExtractDefault = null;

    beforeEach(function () {
        ngxExtractDefault = NgxExtract.from({
            appModulePath: DEFAULT_APP_MODULE_PATH,
            moduleParser: DEFAULT_MODULE_PARSER
        });
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
   }) ;
});