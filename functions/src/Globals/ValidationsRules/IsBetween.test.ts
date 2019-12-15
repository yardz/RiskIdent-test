import { validator } from './IsBetween';

describe('Validation Rules', () => {
	describe('IsBetween', () => {
		const { validate, defaultMessage } = validator;
		describe('validate', () => {
			it('should be true which negative and positive values inside interval', () => {
				expect(validate(-1, { constraints: [{ min: -10, max: 10 }] } as any)).toBe(true);
				expect(validate(0, { constraints: [{ min: -10, max: 10 }] } as any)).toBe(true);
				expect(validate(1, { constraints: [{ min: -10, max: 10 }] } as any)).toBe(true);
			});
			it('should be true which decimal values', () => {
				expect(validate(1.1, { constraints: [{ min: 1, max: 2 }] } as any)).toBe(true);
			});
			it('should be true which limit values', () => {
				expect(validate(1, { constraints: [{ min: 1, max: 2 }] } as any)).toBe(true);
				expect(validate(2, { constraints: [{ min: 1, max: 2 }] } as any)).toBe(true);
			});
			it('should be false which values outside of limit', () => {
				expect(validate(0.99999, { constraints: [{ min: 1, max: 2 }] } as any)).toBe(false);
				expect(validate(2.00001, { constraints: [{ min: 1, max: 2 }] } as any)).toBe(false);
			});

			it('should be false if value is not a number', () => {
				expect(validate('1' as any, { constraints: [{ min: 1, max: 2 }] } as any)).toBe(false);
				expect(validate(Number('a'), { constraints: [{ min: 1, max: 2 }] } as any)).toBe(false);
			});
		});

		describe('defaultMessage', () => {
			it('display correct message', () => {
				const value = 11;
				const min = 1;
				const max = 10;
				expect(defaultMessage({ value, constraints: [{ min, max }] } as any)).toBe(
					`${value} is not a valid number in the range between ${min} and ${max}`,
				);
			});
		});
	});
});
