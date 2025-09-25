import { useState } from 'react';
import AudioUploader from './components/AudioUploader';
import TimeSelector from './components/TimeSelector';
import AudioProcessor from './components/AudioProcessor';
import { AudioFile } from './types/audio';

function App() {
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [startTime, setStartTime] = useState<string>('00:00:00');
  const [endTime, setEndTime] = useState<string>('00:00:10');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: AudioFile) => {
    setAudioFile(file);
  };

  const handleTimeChange = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleProcessingStart = () => {
    setIsProcessing(true);
  };

  const handleProcessingEnd = () => {
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎵 Cut Audio
          </h1>
          <p className="text-xl text-gray-600">
            Corte seus arquivos de áudio com precisão
          </p>
        </header>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Upload do Áudio
            </h2>
            <AudioUploader onFileSelect={handleFileSelect} />
          </div>

          {audioFile && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Configurar Corte
              </h2>
              <TimeSelector
                startTime={startTime}
                endTime={endTime}
                onTimeChange={handleTimeChange}
                disabled={isProcessing}
              />
            </div>
          )}

          {audioFile && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Processar Áudio
              </h2>
              <AudioProcessor
                audioFile={audioFile}
                startTime={startTime}
                endTime={endTime}
                onProcessingStart={handleProcessingStart}
                onProcessingEnd={handleProcessingEnd}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
