import { useCallback, useState } from 'react';
import { AudioFile } from '../types/audio';

interface AudioUploaderProps {
  onFileSelect: (file: AudioFile) => void;
}

const AudioUploader = ({ onFileSelect }: AudioUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/mp4',
      'audio/aac',
      'audio/ogg',
      'audio/flac',
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Formato de arquivo não suportado. Use MP3, WAV, M4A, AAC, OGG ou FLAC.');
      return false;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setError('Arquivo muito grande. Tamanho máximo: 50MB');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (!validateFile(file)) return;
    
    const audioFile: AudioFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    };
    
    onFileSelect(audioFile);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="space-y-4">
          <div className="text-6xl">🎵</div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Arraste seu arquivo de áudio aqui
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ou clique para selecionar
            </p>
          </div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileInput}
            className="hidden"
            id="audio-upload"
          />
          <label
            htmlFor="audio-upload"
            className="btn-primary cursor-pointer inline-block"
          >
            Selecionar Arquivo
          </label>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 text-center">
        Formatos suportados: MP3, WAV, M4A, AAC, OGG, FLAC • Máximo: 50MB
      </div>
    </div>
  );
};

export default AudioUploader;
