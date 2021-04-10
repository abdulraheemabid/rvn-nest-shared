import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";

export class ObjectTypeValidator implements ValidatorConstraintInterface {
    public async validate(val: any, args: ValidationArguments): Promise<boolean> {
        return val !== null && val !== undefined && typeof val === 'object' && !Array.isArray(val);
    }

    public defaultMessage(args: ValidationArguments): string {
        return `value must be an Object {}`;
    }
}