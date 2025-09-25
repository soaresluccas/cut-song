"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutAudioUseCase = void 0;
const path_1 = __importDefault(require("path"));
const TimeRange_1 = require("../../domain/entities/TimeRange");
class CutAudioUseCase {
    constructor(audioProvider, storageProvider) {
        this.audioProvider = audioProvider;
        this.storageProvider = storageProvider;
    }
    async execute(input) {
        const timeRange = new TimeRange_1.TimeRange(input.startSeconds, input.endSeconds);
        const extension = (input.outputExtension || path_1.default.extname(input.filePath) || '.mp3').replace(/^\./, '');
        const outputPath = await this.storageProvider.createTempFilePath(extension);
        await this.audioProvider.cut({
            inputPath: input.filePath,
            outputPath,
            startSeconds: timeRange.startSeconds,
            endSeconds: timeRange.endSeconds,
        });
        const mimeType = this.resolveMimeType(extension);
        return { outputPath, mimeType };
    }
    resolveMimeType(ext) {
        const map = {
            mp3: 'audio/mpeg',
            wav: 'audio/wav',
            aac: 'audio/aac',
            m4a: 'audio/mp4',
            ogg: 'audio/ogg',
            flac: 'audio/flac',
        };
        return map[ext.toLowerCase()] || 'application/octet-stream';
    }
}
exports.CutAudioUseCase = CutAudioUseCase;
//# sourceMappingURL=CutAudioUseCase.js.map