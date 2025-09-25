import { useState } from 'react';
import { AudioFile } from '../types/audio';
import { cutAudio } from '../services/api';

interface AudioProcessorProps {
  audioFile: AudioFile;
  startTime: string;
  endTime: string;
  onProcessingStart: () => void;
  onProcessingEnd: () => void;
  isProcessing: boolean;
}

const AudioProcessor = ({
  audioFile,
  startTime,
  endTime,
  onProcessingStart,
  onProcessingEnd,
  isProcessing,
}: AudioProcessorProps) => {
  const [result, setResult] = useState<{ success: boolean; message?: string; downloadUrl?: string } | null>(null);

  const handleProcess = async () => {
    onProcessingStart();
    setResult(null);

    try {
      const response = await cutAudio(audioFile.file, {
        startTime,
        endTime,
        outputFormat: 'mp3',
      });

      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        message: 'Erro inesperado ao processar o áudio',
      });
    } finally {
      onProcessingEnd();
    }
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = `cut-${audioFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-2">Arquivo Selecionado</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Nome:</strong> {audioFile.name}</p>
          <p><strong>Tamanho:</strong> {formatFileSize(audioFile.size)}</p>
          <p><strong>Tipo:</strong> {audioFile.type}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-2">Configuração do Corte</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Início:</strong> {startTime}</p>
          <p><strong>Fim:</strong> {endTime}</p>
        </div>
      </div>

      <button
        onClick={handleProcess}
        disabled={isProcessing}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processando...</span>
          </div>
        ) : (
          'Cortar Áudio'
        )}
      </button>

      {result && (
        <div className={`rounded-lg p-4 ${
          result.success
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          {result.success ? (
            <div className="space-y-3">
              <p className="text-green-700 font-medium">
                ✅ Áudio processado com sucesso!
              </p>
              <button
                onClick={handleDownload}
                className="btn-primary"
              >
                📥 Baixar Arquivo
              </button>
            </div>
          ) : (
            <p className="text-red-700">
              ❌ {result.message || 'Erro ao processar o áudio'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioProcessor;
