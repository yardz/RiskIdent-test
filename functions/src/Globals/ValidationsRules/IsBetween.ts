import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

interface Property {
	min: number;
	max: number;
}

export const validator = {
	validate(value: number, args: ValidationArguments) {
		if (typeof value !== 'number') {
			return false;
		}
		const [relatedPropertyName] = args.constraints;
		const { min, max }: Property = relatedPropertyName;

		return value >= min && value <= max;
	},
	defaultMessage(args: ValidationArguments) {
		const { value } = args;
		const [relatedPropertyName] = args.constraints;
		const { min, max }: Property = relatedPropertyName;

		return `${value} is not a valid number in the range between ${min} and ${max}`;
	},
};

export function IsBetween(property: Property, validationOptions?: ValidationOptions) {
	return function(object: Object, propertyName: string) {
		registerDecorator({
			name: 'isBetween',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator,
		});
	};
}
