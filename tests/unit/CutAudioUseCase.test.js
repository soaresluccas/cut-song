"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CutAudioUseCase_1 = require("../../src/application/use-cases/CutAudioUseCase");
class AudioMock {
    constructor() {
        this.cut = jest.fn().mockResolvedValue(undefined);
    }
}
class StorageMock {
    constructor() {
        this.createTempFilePath = jest.fn().mockResolvedValue('/tmp/out.mp3');
        this.getReadStream = jest.fn();
        this.saveTemp = jest.fn();
        this.remove = jest.fn();
    }
}
describe('CutAudioUseCase', () => {
    it('orquestra corte com providers', async () => {
        const audio = new AudioMock();
        const storage = new StorageMock();
        const uc = new CutAudioUseCase_1.CutAudioUseCase(audio, storage);
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
//# sourceMappingURL=CutAudioUseCase.test.js.map