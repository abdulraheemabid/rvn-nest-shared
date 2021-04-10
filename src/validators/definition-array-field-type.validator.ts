import { ValidationArguments } from "class-validator";
import { FieldTypeEnum } from "../enums";

export class DefinitionArrayFieldValidationPipe {
    constructor() { }

    public async validate(val: any, args: ValidationArguments): Promise<boolean> {

        if (args.object["type"] && args.object["type"] == FieldTypeEnum.ARRAY) {
            return (
                val
                && Array.isArray(val)
                && val.length > 0
                && val.filter(arrVal => ["", null, undefined, "null", "undefined"].includes(arrVal)).length === 0
            );
        }

        return true;
    }

    public defaultMessage(args: ValidationArguments): string {
        return `arrayValues should not be empty or contain invalid values if type is set to ${FieldTypeEnum.ARRAY}`;
    }
}