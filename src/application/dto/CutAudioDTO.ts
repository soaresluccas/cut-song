export interface CutAudioInputDTO {
  filePath: string;
  startSeconds: number;
  endSeconds: number;
  outputExtension?: string;
}

export interface CutAudioOutputDTO {
  outputPath: string;
  mimeType: string;
}

