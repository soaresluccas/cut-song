import { CutAudioUseCase } from '../../src/application/use-cases/CutAudioUseCase';

class AudioMock {
  cut = jest.fn().mockResolvedValue(undefined);
}

class StorageMock {
  createTempFilePath = jest.fn().mockResolvedValue('/tmp/out.mp3');
  getReadStream = jest.fn();
  saveTemp = jest.fn();
  remove = jest.fn();
}

describe('CutAudioUseCase', () => {
  it('orquestra corte com providers', async () => {
    const audio = new AudioMock();
    const storage = new StorageMock();
    const uc = new CutAudioUseCase(audio as any, storage as any);

    const result = await uc.execute({ filePath: '/in.mp3', startSeconds: 1, endSeconds: 3 });

    expect(audio.cut).toHaveBeenCalledWith({
      inputPath: '/in.mp3',
      outputPath: '/tmp/out.mp3',
      startSeconds: 1,
      endSeconds: 3,
    });
    expect(result.outputPath).toBe('/tmp/out.mp3');
  });
});

