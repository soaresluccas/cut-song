import { Router } from 'express';
import { upload } from './presentation/http/multer';
import { FFmpegAudioProcessingProvider } from './infrastructure/providers/audio/FFmpegAudioProcessingProvider';
import { LocalTempStorageProvider } from './infrastructure/providers/storage/LocalTempStorageProvider';
import { CutAudioUseCase } from './application/use-cases/CutAudioUseCase';
import { CutAudioController } from './presentation/http/controllers/CutAudioController';

const router = Router();

const audioProvider = new FFmpegAudioProcessingProvider();
const storageProvider = new LocalTempStorageProvider();
const useCase = new CutAudioUseCase(audioProvider, storageProvider);
const controller = new CutAudioController(useCase, storageProvider);

router.post('/audio/cut', upload.single('file'), controller.handle);

export { router };

