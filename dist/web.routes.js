"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = require("./presentation/http/multer");
const FFmpegAudioProcessingProvider_1 = require("./infrastructure/providers/audio/FFmpegAudioProcessingProvider");
const LocalTempStorageProvider_1 = require("./infrastructure/providers/storage/LocalTempStorageProvider");
const CutAudioUseCase_1 = require("./application/use-cases/CutAudioUseCase");
const CutAudioController_1 = require("./presentation/http/controllers/CutAudioController");
const router = (0, express_1.Router)();
exports.router = router;
const audioProvider = new FFmpegAudioProcessingProvider_1.FFmpegAudioProcessingProvider();
const storageProvider = new LocalTempStorageProvider_1.LocalTempStorageProvider();
const useCase = new CutAudioUseCase_1.CutAudioUseCase(audioProvider, storageProvider);
const controller = new CutAudioController_1.CutAudioController(useCase, storageProvider);
router.post('/audio/cut', multer_1.upload.single('file'), controller.handle);
//# sourceMappingURL=web.routes.js.map