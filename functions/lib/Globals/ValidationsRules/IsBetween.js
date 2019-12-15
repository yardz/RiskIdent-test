"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
exports.validator = {
    validate(value, args) {
        if (typeof value !== 'number') {
            return false;
        }
        const [relatedPropertyName] = args.constraints;
        const { min, max } = relatedPropertyName;
        return value >= min && value <= max;
    },
    defaultMessage(args) {
        const { value } = args;
        const [relatedPropertyName] = args.constraints;
        const { min, max } = relatedPropertyName;
        return `${value} is not a valid number in the range between ${min} and ${max}`;
    },
};
function IsBetween(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isBetween',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: exports.validator,
        });
    };
}
exports.IsBetween = IsBetween;
//# sourceMappingURL=IsBetween.js.map