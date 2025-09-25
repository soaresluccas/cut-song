import { useState, useEffect } from 'react';

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  onTimeChange: (start: string, end: string) => void;
  disabled?: boolean;
}

const TimeSelector = ({ startTime, endTime, onTimeChange, disabled }: TimeSelectorProps) => {
  const [start, setStart] = useState(startTime);
  const [end, setEnd] = useState(endTime);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStart(startTime);
    setEnd(endTime);
  }, [startTime, endTime]);

  const validateTime = (time: string): boolean => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const parseTimeToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatSecondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStart(value);
    } else {
      setEnd(value);
    }

    if (!validateTime(value)) {
      setError('Formato inválido. Use HH:MM:SS');
      return;
    }

    const startSeconds = parseTimeToSeconds(type === 'start' ? value : start);
    const endSeconds = parseTimeToSeconds(type === 'end' ? value : end);

    if (endSeconds <= startSeconds) {
      setError('O tempo final deve ser maior que o inicial');
      return;
    }

    setError(null);
    onTimeChange(
      type === 'start' ? value : start,
      type === 'end' ? value : end
    );
  };

  const handleQuickSelect = (duration: number) => {
    const newEnd = formatSecondsToTime(parseTimeToSeconds(start) + duration);
    setEnd(newEnd);
    onTimeChange(start, newEnd);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempo Inicial
          </label>
          <input
            type="text"
            value={start}
            onChange={(e) => handleTimeChange('start', e.target.value)}
            placeholder="00:00:00"
            disabled={disabled}
            className="input-field"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempo Final
          </label>
          <input
            type="text"
            value={end}
            onChange={(e) => handleTimeChange('end', e.target.value)}
            placeholder="00:00:10"
            disabled={disabled}
            className="input-field"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleção Rápida
        </label>
        <div className="flex flex-wrap gap-2">
          {[5, 10, 15, 30, 60].map((seconds) => (
            <button
              key={seconds}
              onClick={() => handleQuickSelect(seconds)}
              disabled={disabled}
              className="btn-secondary text-sm"
            >
              +{seconds}s
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-700 text-sm">
          <strong>Dica:</strong> Use o formato HH:MM:SS (ex: 01:30:45) ou clique nos botões de seleção rápida.
        </p>
      </div>
    </div>
  );
};

export default TimeSelector;
