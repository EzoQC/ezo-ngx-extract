const fs = require('fs');
const PathTools = require('../path-tools/path-tools');

class NgxTsModuleParser {
    constructor(fileSystem) {
        this._pathTools = new PathTools(fileSystem);
    }

    static fromRoot(path, fileSystem = fs) {
        const parser = new NgxTsModuleParser(fileSystem);

        parser.path = path;

        return parser;
    }

    isPathValid() {
        return this._pathTools.exists(this.path)
            && this._pathTools.exists(this._moduleClassPath);
    }

    isAngularModule(path) {
        let isAngularModule = false;

        if (this._pathTools.exists(path)) {
            let moduleContent = this._pathTools.read(path);
            isAngularModule = moduleContent.indexOf('@NgModule') > -1;
        }

        return isAngularModule;
    }

    getChildModulePath(fullName) {
        const shortNameSplit = fullName.split('/');
        const shortName = shortNameSplit[shortNameSplit.length - 1];
        return [this.path, fullName, `${shortName}.module.ts`].join(this._pathTools.sep);
    }

    childModuleExists(fullName) {
        let path = this.getChildModulePath(fullName);
        return this.isAngularModule(path);
    }

    get path() { return this._path }
    set path(path) {
        this._path = path;
        this._moduleClassPath = [path, 'app.module.ts'].join(this._pathTools.sep);
    }
}

module.exports = NgxTsModuleParser;