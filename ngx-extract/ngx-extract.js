class NgxExtract {
    static from(params) {
        const ngxExtract = new NgxExtract();

        ngxExtract.appModulePath = params.appModulePath;
        ngxExtract.moduleParser = params.moduleParser;

        return ngxExtract;
    }

    extractModule(options) {
        if (!options.fullName || !options.destinationFolder) throw new Error();
        let moduleToExtractPath = this.moduleParser.getChildModulePath(options.fullName);

        if (!this.moduleParser.isAngularModule(moduleToExtractPath)
            || this.moduleParser._pathTools.exists(options.destinationFolder)) {
            throw new Error();
        }

        this.moduleParser._pathTools.createFolder(options.destinationFolder);
        this.moduleParser._pathTools.createFolder(options.destinationFolder);
    }

    get appModulePath() { return this._appModulePath }
    set appModulePath(appModulePath) { this._appModulePath = appModulePath }

    get moduleParser() { return this._moduleParser }
    set moduleParser(moduleParser) { this._moduleParser = moduleParser }
}

module.exports = NgxExtract;