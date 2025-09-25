"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutAudioController = void 0;
const validators_1 = require("../validators");
const TimeRange_1 = require("../../../domain/entities/TimeRange");
class CutAudioController {
    constructor(useCase, storageProvider) {
        this.handle = async (req, res) => {
            try {
                if (!req.file) {
                    return res.status(400).json({ message: 'Arquivo não enviado' });
                }
                const q = await (0, validators_1.toValidatedQuery)(validators_1.CutQueryDTO, req.query);
                if (!q.start || !q.end) {
                    return res.status(400).json({ message: 'Parâmetros start e end são obrigatórios' });
                }
                const startSeconds = TimeRange_1.TimeRange.parseTimeToSeconds(q.start);
                const endSeconds = TimeRange_1.TimeRange.parseTimeToSeconds(q.end);
                const input = {
                    filePath: req.file.path,
                    startSeconds,
                    endSeconds,
                    outputExtension: q.outputExtension,
                };
                const result = await this.useCase.execute(input);
                res.setHeader('Content-Type', result.mimeType);
                res.setHeader('Content-Disposition', 'attachment; filename="cut-audio.mp3"');
                const stream = this.storageProvider.getReadStream(result.outputPath);
                stream.pipe(res);
                stream.on('close', () => {
                    this.storageProvider.remove(result.outputPath);
                });
                stream.on('error', (err) => {
                    console.error('Stream error:', err);
                    this.storageProvider.remove(result.outputPath);
                });
            }
            catch (err) {
                console.error('Controller error:', err);
                const status = err?.statusCode || 500;
                res.status(status).json({ message: err?.message || 'Erro ao processar áudio' });
            }
        };
        this.useCase = useCase;
        this.storageProvider = storageProvider;
    }
}
exports.CutAudioController = CutAudioController;
//# sourceMappingURL=CutAudioController.js.map