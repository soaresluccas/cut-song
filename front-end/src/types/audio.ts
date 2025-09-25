export interface AudioFile {
  file: File;
  name: string;
  size: number;
  type: string;
  duration?: number;
}

export interface CutParams {
  startTime: string;
  endTime: string;
  outputFormat?: string;
}

export interface ProcessingResult {
  success: boolean;
  message?: string;
  downloadUrl?: string;
}
