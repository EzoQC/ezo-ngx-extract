const fs = require('fs');

class NgxTsModuleParser {
    constructor(fileSystem) {
        this._fileSystem = fileSystem;
    }

    static fromRoot(path, fileSystem = fs) {
        const parser = new NgxTsModuleParser(fileSystem);

        parser.path = path;

        return parser;
    }

    isPathValid() {
        return this._fileSystem.existsSync(this.path)
            && this._fileSystem.existsSync(this._moduleClassPath);
    }

    isAngularModule() {
        let isAngularModule = false;

        if (this.isPathValid()) {
            let moduleContent = this._fileSystem.readFileSync(this._moduleClassPath);
            isAngularModule = moduleContent.toString().indexOf('@NgModule') > -1;
        }

        return isAngularModule;
    }

    get path() { return this._path }
    set path(path) {
        this._path = path;
        this._moduleClassPath = `${path}/app.module.ts` ;
    }
}

module.exports = NgxTsModuleParser;