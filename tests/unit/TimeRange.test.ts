import { TimeRange } from '../../src/domain/entities/TimeRange';

describe('TimeRange', () => {
  it('calcula duração corretamente', () => {
    const tr = new TimeRange(5, 10);
    expect(tr.durationSeconds).toBe(5);
  });

  it('parse HH:MM:SS', () => {
    expect(TimeRange.parseTimeToSeconds('01:02:03')).toBe(3723);
  });

  it('lança erro para fim <= início', () => {
    expect(() => new TimeRange(10, 10)).toThrow();
  });
});

