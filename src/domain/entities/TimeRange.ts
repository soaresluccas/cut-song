import { ValidationError } from '../../shared/errors/DomainError';

export class TimeRange {
  public readonly startSeconds: number;
  public readonly endSeconds: number;

  constructor(startSeconds: number, endSeconds: number) {
    if (!Number.isFinite(startSeconds) || !Number.isFinite(endSeconds)) {
      throw new ValidationError('Parâmetros de tempo inválidos');
    }
    if (startSeconds < 0 || endSeconds <= 0) {
      throw new ValidationError('Tempos devem ser positivos');
    }
    if (endSeconds <= startSeconds) {
      throw new ValidationError('Fim deve ser maior que início');
    }
    this.startSeconds = Math.floor(startSeconds);
    this.endSeconds = Math.floor(endSeconds);
  }

  get durationSeconds(): number {
    return this.endSeconds - this.startSeconds;
  }

  static parseTimeToSeconds(value: string | number): number {
    if (typeof value === 'number') return value;
    const parts = value.split(':').map((p) => Number(p));
    if (parts.some((n) => !Number.isFinite(n))) {
      throw new ValidationError('Formato de tempo inválido');
    }
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      seconds = parts[0];
    } else {
      throw new ValidationError('Formato de tempo inválido');
    }
    return seconds;
  }
}

