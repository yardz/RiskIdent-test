import { ValidationOptions, ValidationArguments } from 'class-validator';
interface Property {
    min: number;
    max: number;
}
export declare const validator: {
    validate(value: number, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
};
export declare function IsBetween(property: Property, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export {};
