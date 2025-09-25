import { randomUUID } from 'crypto';

export class AudioFile {
  public readonly id: string;
  public readonly path: string;
  public readonly originalName: string;
  public readonly mimeType: string;

  constructor(params: { path: string; originalName: string; mimeType: string }) {
    this.id = randomUUID();
    this.path = params.path;
    this.originalName = params.originalName;
    this.mimeType = params.mimeType;
  }
}

