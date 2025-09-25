import { Request, Response } from 'express';
import { CutAudioUseCase } from '../../../application/use-cases/CutAudioUseCase';
import { CutAudioInputDTO } from '../../../application/dto/CutAudioDTO';
import { CutQueryDTO, toValidatedQuery } from '../validators';
import { TimeRange } from '../../../domain/entities/TimeRange';
import { IStorageProvider } from '../../../domain/services/IStorageProvider';

export class CutAudioController {
  private readonly useCase: CutAudioUseCase;
  private readonly storageProvider: IStorageProvider;

  constructor(useCase: CutAudioUseCase, storageProvider: IStorageProvider) {
    this.useCase = useCase;
    this.storageProvider = storageProvider;
  }

  handle = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Arquivo não enviado' });
      }
      
      const q = await toValidatedQuery(CutQueryDTO, req.query);
      
      if (!q.start || !q.end) {
        return res.status(400).json({ message: 'Parâmetros start e end são obrigatórios' });
      }
      
      const startSeconds = TimeRange.parseTimeToSeconds(q.start);
      const endSeconds = TimeRange.parseTimeToSeconds(q.end);
      
      const input: CutAudioInputDTO = {
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
      
    } catch (err: any) {
      console.error('Controller error:', err);
      const status = err?.statusCode || 500;
      res.status(status).json({ message: err?.message || 'Erro ao processar áudio' });
    }
  };
}

