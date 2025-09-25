"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalTempStorageProvider = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
class LocalTempStorageProvider {
    async createTempFilePath(extension) {
        const dir = path_1.default.join(os_1.default.tmpdir(), 'cut-song');
        await fs_1.default.promises.mkdir(dir, { recursive: true });
        const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension ? (extension.startsWith('.') ? extension : `.${extension}`) : ''}`;
        return path_1.default.join(dir, name);
    }
    async saveTemp(params) {
        const filePath = await this.createTempFilePath(params.extension);
        await fs_1.default.promises.writeFile(filePath, params.buffer);
        return filePath;
    }
    getReadStream(filePath) {
        return fs_1.default.createReadStream(filePath);
    }
    async remove(filePath) {
        try {
            await fs_1.default.promises.unlink(filePath);
        }
        catch (_) {
        }
    }
}
exports.LocalTempStorageProvider = LocalTempStorageProvider;
//# sourceMappingURL=LocalTempStorageProvider.js.map