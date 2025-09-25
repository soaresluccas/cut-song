export interface CutParams {
  inputPath: string;
  outputPath: string;
  startSeconds: number;
  endSeconds: number;
}

export interface IAudioProcessingProvider {
  cut(params: CutParams): Promise<void>;
}

