class NgxExtractOptions {
    get sourceModuleName() { return this._sourceModuleName }
    get destinationModuleName() { return this._destinationModuleName }
    get destinationModulePath() { return this._destinationModulePath }

    set sourceModuleName(sourceModuleName) { this._sourceModuleName = sourceModuleName; return this; }
    set destinationModuleName(destinationModuleName) { this._destinationModuleName = destinationModuleName; return this; }
    set destinationModulePath(destinationModulePath) { this._destinationModulePath = destinationModulePath; return this; }
}