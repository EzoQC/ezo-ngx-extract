class NgxExtract {
    static from(params) {
        const ngxExtract = new NgxExtract();

        ngxExtract.appModulePath = params.appModulePath;
        ngxExtract.moduleParser = params.moduleParser;

        return ngxExtract;
    }

    extractModule(options) {

    }

    get appModulePath() { return this._appModulePath }
    set appModulePath(appModulePath) { this._appModulePath = appModulePath }

    get moduleParser() { return this._moduleParser }
    set moduleParser(moduleParser) { this._moduleParser = moduleParser }
}

module.exports = NgxExtract;