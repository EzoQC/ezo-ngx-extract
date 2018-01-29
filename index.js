const NgxExtract = require('./ngx-extract/ngx-extract');
const NgxTsModuleParser = require('./ngx-ts-module-parser/ngx-ts-module-parser');

/* Remove */
const moduleParser = NgxTsModuleParser.fromRoot('C:\\Users\\Mona\\Desktop\\inplace-input\\inplace-input\\src\\app');
const extractor = NgxExtract.from({
    appModulePath: moduleParser.path,
    moduleParser: moduleParser
});

extractor.extractModule({
    fullName: 'inplace-input',
    destinationFolder: 'C:\\Users\\Mona\\Desktop\\inplace-input\\extracted',
    extractedModuleOptions: {
        "name": "ezo-ngx-extract",
        "description": "Extrait un module angular d'une application",
        "author": "Ezo",
        "license": "ISC"
    }
});

/* stop remove */

module.exports = NgxExtract;