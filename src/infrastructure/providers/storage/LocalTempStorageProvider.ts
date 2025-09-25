import fs from 'fs';
import path from 'path';
import os from 'os';
import { IStorageProvider, SaveTempParams } from '../../../domain/services/IStorageProvider';

export class LocalTempStorageProvider implements IStorageProvider {
  async createTempFilePath(extension?: string): Promise<string> {
    const dir = path.join(os.tmpdir(), 'cut-song');
    await fs.promises.mkdir(dir, { recursive: true });
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension ? (extension.startsWith('.') ? extension : `.${extension}`) : ''}`;
    return path.join(dir, name);
  }

  async saveTemp(params: SaveTempParams): Promise<string> {
    const filePath = await this.createTempFilePath(params.extension);
    await fs.promises.writeFile(filePath, params.buffer);
    return filePath;
  }

  getReadStream(filePath: string): NodeJS.ReadableStream {
    return fs.createReadStream(filePath);
  }

  async remove(filePath: string): Promise<void> {
    try {
      await fs.promises.unlink(filePath);
    } catch (_) {
    }
  }
}

