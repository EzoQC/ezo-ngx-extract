class MockFS {
    existsSync(path) {
        if (!this.existsSyncReturnIfPaths) this.existsSyncReturnIfPaths = [];

        let returnedValue = this.existsSyncReturnIfValue;

        if (this.existsSyncReturnIfPaths.indexOf(path) === -1) {
            returnedValue = !returnedValue;
        }

        return returnedValue;
    }

    existsSyncShouldReturnIf(value, trueValues) {
        this.existsSyncReturnIfPaths = trueValues;
        this.existsSyncReturnIfValue = value;
    }

    setFileContent(filePath, content) {
        if (!this.filesContents) this.filesContents = {};
        this.filesContents[filePath] = content;
    }

    readFileSync(path) {
        return {
            toString: () => this.filesContents[path] || ''
        };
    }

    mkdirSync(path) {
        if (!this.existsSyncReturnIfPaths) this.existsSyncReturnIfPaths = [];
        if (!this.folders) this.folders = [];

        this.existsSyncReturnIfPaths.push(path);
        this.folders.push(path);
    }

    lstatSync(path) {
        return {
            isDirectory: () => {
                return this.folders.indexOf(path) > -1;
            }
        }
    }

    unlinkSync(path) {
        let idxOfPathInFiles = this.existsSyncReturnIfPaths.indexOf(path);
        if (this.existsSyncReturnIfPaths && idxOfPathInFiles > -1) {
            this.existsSyncReturnIfPaths.splice(idxOfPathInFiles, 1);
        }

        this.rmdirSync(path);
    }

    readdirSync(path) {
        return [];
    }

    rmdirSync(path) {
        let idxOfPathInFolders = this.folders.indexOf(path);
        if (this.folders && idxOfPathInFolders > -1) {
            this.folders.splice(idxOfPathInFolders, 1);
        }
    }

    writeSync(id, content) {
        if (this.ids == null) {
            this.ids = {};
        }

        let path = this.ids[id];
        if (path) {
            this.setFileContent(path, content);
        }
    }

    openSync(path, flags) {
        if (this.ids == null) {
            this.ids = {};
        }

        let id = new Date().getTime();

        this.ids[id] = path;
        this.setFileContent(path, '');

        return id;
    }

    closeSync(id) {
        if (this.ids == null) {
            this.ids = {};
        }

        this.ids[id] = null;
    }
}

module.exports = MockFS;