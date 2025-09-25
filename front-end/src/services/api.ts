import axios from 'axios';
import { CutParams, ProcessingResult } from '../types/audio';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const cutAudio = async (
  file: File,
  params: CutParams
): Promise<ProcessingResult> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const queryParams = new URLSearchParams({
    start: params.startTime,
    end: params.endTime,
  });
  
  if (params.outputFormat) {
    queryParams.append('outputExtension', params.outputFormat);
  }

  try {
    const response = await api.post(`/audio/cut?${queryParams}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const downloadUrl = URL.createObjectURL(blob);

    return {
      success: true,
      downloadUrl,
    };
  } catch (error: any) {
    console.error('Erro ao processar áudio:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao processar áudio',
    };
  }
};
