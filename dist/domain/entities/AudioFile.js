"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioFile = void 0;
const crypto_1 = require("crypto");
class AudioFile {
    constructor(params) {
        this.id = (0, crypto_1.randomUUID)();
        this.path = params.path;
        this.originalName = params.originalName;
        this.mimeType = params.mimeType;
    }
}
exports.AudioFile = AudioFile;
//# sourceMappingURL=AudioFile.js.map