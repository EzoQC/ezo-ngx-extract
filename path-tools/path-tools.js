const path = require('path');
const fs = require('fs');

class PathTools {
    constructor(fileSystem = fs) {
        this.sep = path.sep;
        this._fs = fileSystem;
    }

    exists(path) {
        return this._fs.existsSync(path);
    }

    read(path) {
        let content = null;

        if (this.exists(path)) {
            content = this._fs.readFileSync(path).toString();
        }

        return content;
    }

    createFolder(path) {
        if (!this.exists(path)) {
            this._fs.mkdirSync(path);
        }
    }

    createFile(path, content) {
        if (!this.exists(path)) {
            const file = this._fs.openSync(path, 'w');
            this._fs.writeSync(file, content);
            this._fs.closeSync(file);
        }
    }

    deleteFolderAndContent(path) {
        if (this.exists(path)) {
            if (this._fs.lstatSync(path).isDirectory()) {
                this._fs.readdirSync(path).forEach((file) => {
                    this.deleteFolderAndContent(file)
                });

                this._fs.rmdirSync(path);
            } else {
                this._fs.unlinkSync(path);
            }
        }
    }

}

module.exports = PathTools;