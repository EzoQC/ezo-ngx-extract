const path = require('path');

const npmPackageFileName = 'package.json';

class NpmPackageBuilder {

    constructor(pathTools) {
        this._pathTools = pathTools;
    }

    buildPackageJsonPath(root) {
        return [root, npmPackageFileName].join(path.sep);
    }

    createPackageJson(root, options) {
        const packageJson = {};

        const path = this.buildPackageJsonPath(options.name);
        packageJson.name = options.name;
        packageJson.version = options.version || '1.0.0';
        packageJson.description = options.description;
        packageJson.main = 'index.js';
        packageJson.author = options.author;
        packageJson.license = options.license;

        this._pathTools.createFile(path, JSON.stringify(packageJson));
    }
}

module.exports = NpmPackageBuilder;