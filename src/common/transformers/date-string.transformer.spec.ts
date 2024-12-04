import { plainToClass } from 'class-transformer';
import { DateStringTransform } from './date-string.transformer';

describe('DateStringTransform', () => {
  class TestDto {
    @DateStringTransform()
    date: string | Date;
  }

  describe('ISO9601 date string convertor', () => {
    it('should convert a valid date to ISO9601 format', () => {
      const date = new Date();
      const instance = plainToClass(TestDto, { date });

      expect(instance.date).toBe(date.toISOString());
    });

    it('should return original string if date invalid', () => {
      const date = 'hello';
      const instance = plainToClass(TestDto, { date });

      expect(instance.date).toBe('hello');
    });
  });
});
