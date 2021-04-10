import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
// add  @Validate(EntryValidator) on dto prop
// add useContainer(app.select(EntryModule), { fallbackOnErrors: true }); in main.ts
export class EntryValidator implements ValidatorConstraintInterface {
    constructor() { }

    public async validate(val: any, args: ValidationArguments): Promise<boolean> {
        //TODO: implement
        return true;
    }

    public defaultMessage(args: ValidationArguments): string {
        return `Entry does not meet definition criteria`;
    }
}