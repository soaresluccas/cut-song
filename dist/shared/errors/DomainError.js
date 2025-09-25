"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ValidationError = exports.DomainError = void 0;
class DomainError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'DomainError';
        this.statusCode = statusCode;
    }
}
exports.DomainError = DomainError;
class ValidationError extends DomainError {
    constructor(message) {
        super(message, 422);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends DomainError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=DomainError.js.map