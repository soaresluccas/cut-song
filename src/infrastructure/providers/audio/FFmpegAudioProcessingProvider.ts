import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { IAudioProcessingProvider, CutParams } from '../../../domain/services/IAudioProcessingProvider';

if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

export class FFmpegAudioProcessingProvider implements IAudioProcessingProvider {
  async cut(params: CutParams): Promise<void> {
    const { inputPath, outputPath, startSeconds, endSeconds } = params;
    const duration = endSeconds - startSeconds;
    await new Promise<void>((resolve, reject) => {
      ffmpeg()
        .input(inputPath)
        .setStartTime(startSeconds)
        .duration(duration)
        .outputOptions(['-acodec copy'])
        .on('end', () => resolve())
        .on('error', (err: Error) => reject(err))
        .save(outputPath);
    });
  }
}

