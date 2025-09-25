"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFmpegAudioProcessingProvider = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
if (ffmpeg_static_1.default) {
    fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
}
class FFmpegAudioProcessingProvider {
    async cut(params) {
        const { inputPath, outputPath, startSeconds, endSeconds } = params;
        const duration = endSeconds - startSeconds;
        await new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input(inputPath)
                .setStartTime(startSeconds)
                .duration(duration)
                .outputOptions(['-acodec copy'])
                .on('end', () => resolve())
                .on('error', (err) => reject(err))
                .save(outputPath);
        });
    }
}
exports.FFmpegAudioProcessingProvider = FFmpegAudioProcessingProvider;
//# sourceMappingURL=FFmpegAudioProcessingProvider.js.map