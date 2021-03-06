import { FieldTypeEnum } from "./common.enums";

export function getAllowedFieldTypesConcatedString(delimeter: string) {
    return Object.keys(FieldTypeEnum).map(item => FieldTypeEnum[item]).join(delimeter);
}

export function getEntryTableNameByDefinitionId(definitionId: number | string) {
    return `def_${definitionId}_entry`;
}

export function isNullOrUndefined(val: any) {
    return val === null || val === undefined;
}

export function isNumberString(val: string) {
    return /^\d+$/.test(val);
}