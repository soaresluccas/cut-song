import path from 'path';
import { CutAudioInputDTO, CutAudioOutputDTO } from '../dto/CutAudioDTO';
import { IAudioProcessingProvider } from '../../domain/services/IAudioProcessingProvider';
import { IStorageProvider } from '../../domain/services/IStorageProvider';
import { TimeRange } from '../../domain/entities/TimeRange';

export class CutAudioUseCase {
  private readonly audioProvider: IAudioProcessingProvider;
  private readonly storageProvider: IStorageProvider;

  constructor(audioProvider: IAudioProcessingProvider, storageProvider: IStorageProvider) {
    this.audioProvider = audioProvider;
    this.storageProvider = storageProvider;
  }

  async execute(input: CutAudioInputDTO): Promise<CutAudioOutputDTO> {
    const timeRange = new TimeRange(input.startSeconds, input.endSeconds);
    const extension = (input.outputExtension || path.extname(input.filePath) || '.mp3').replace(/^\./, '');
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

  private resolveMimeType(ext: string): string {
    const map: Record<string, string> = {
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

