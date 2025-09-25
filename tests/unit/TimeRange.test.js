"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TimeRange_1 = require("../../src/domain/entities/TimeRange");
describe('TimeRange', () => {
    it('calcula duração corretamente', () => {
        const tr = new TimeRange_1.TimeRange(5, 10);
        expect(tr.durationSeconds).toBe(5);
    });
    it('parse HH:MM:SS', () => {
        expect(TimeRange_1.TimeRange.parseTimeToSeconds('01:02:03')).toBe(3723);
    });
    it('lança erro para fim <= início', () => {
        expect(() => new TimeRange_1.TimeRange(10, 10)).toThrow();
    });
});
//# sourceMappingURL=TimeRange.test.js.map