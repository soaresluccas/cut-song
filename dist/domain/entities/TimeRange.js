"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRange = void 0;
const DomainError_1 = require("../../shared/errors/DomainError");
class TimeRange {
    constructor(startSeconds, endSeconds) {
        if (!Number.isFinite(startSeconds) || !Number.isFinite(endSeconds)) {
            throw new DomainError_1.ValidationError('Parâmetros de tempo inválidos');
        }
        if (startSeconds < 0 || endSeconds <= 0) {
            throw new DomainError_1.ValidationError('Tempos devem ser positivos');
        }
        if (endSeconds <= startSeconds) {
            throw new DomainError_1.ValidationError('Fim deve ser maior que início');
        }
        this.startSeconds = Math.floor(startSeconds);
        this.endSeconds = Math.floor(endSeconds);
    }
    get durationSeconds() {
        return this.endSeconds - this.startSeconds;
    }
    static parseTimeToSeconds(value) {
        if (typeof value === 'number')
            return value;
        const parts = value.split(':').map((p) => Number(p));
        if (parts.some((n) => !Number.isFinite(n))) {
            throw new DomainError_1.ValidationError('Formato de tempo inválido');
        }
        let seconds = 0;
        if (parts.length === 3) {
            seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        else if (parts.length === 2) {
            seconds = parts[0] * 60 + parts[1];
        }
        else if (parts.length === 1) {
            seconds = parts[0];
        }
        else {
            throw new DomainError_1.ValidationError('Formato de tempo inválido');
        }
        return seconds;
    }
}
exports.TimeRange = TimeRange;
//# sourceMappingURL=TimeRange.js.map