export interface SaveTempParams {
  buffer: Buffer;
  extension?: string;
}

export interface IStorageProvider {
  createTempFilePath(extension?: string): Promise<string>;
  saveTemp(params: SaveTempParams): Promise<string>;
  getReadStream(path: string): NodeJS.ReadableStream;
  remove(path: string): Promise<void>;
}

