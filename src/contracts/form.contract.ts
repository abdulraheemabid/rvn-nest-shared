import { FieldTypeEnum } from "../common.enums";
import { GenericObject, IContractMessages } from "../common.interface";
import { DefinitionResponseDTO, EntryResponseDTO, IdDTO } from "../contracts/das.contract";

export interface IFormMethods {
    fetchAllForms(): Promise<DefinitionResponseDTO[]>;
    fetchFormDirectChildren(formDTO: FormIdDTO): Promise<number[]>;
    fetchAllFormTrees(): Promise<FormRelationDTO[]>;
    fetchFormById(formDTO: FormIdDTO): Promise<DefinitionResponseDTO>;
    createForm(formDTO: FormDTO): Promise<IdDTO>;
    updateForm(formDTO: FormUpdateDTO): Promise<IdDTO>;
    deleteForm(formDTO: FormIdDTO): Promise<IdDTO>;

    fetchAllRecords(recordSearchDTO: RecordSearchDTO): Promise<EntryResponseDTO[]>;
    fetchARecordById(recordDto: RecordIdDTO): Promise<EntryResponseDTO>;
    createRecord(recordDto: RecordDTO): Promise<IdDTO>;
    updateRecord(recordDto: RecordUpdateDTO): Promise<IdDTO>;
    deleteRecord(recordDto: RecordDeleteDTO): Promise<IdDTO>;
}

// All meesages used for the methods in DAS Service 
export class FormContractMessages implements IContractMessages {
    readonly serviceName = "form";
    readonly modules = {
        form: {
            fetchAll: { service: this.serviceName, module: "form", method: "fetchAllForms" },
            fetchFormDirectChildren: { service: this.serviceName, module: "form", method: "fetchFormDirectChildren" },
            fetchAllFormTrees: { service: this.serviceName, module: "form", method: "fetchAllFormTrees" },
            fetchById: { service: this.serviceName, module: "form", method: "fetchFormById" },
            create: { service: this.serviceName, module: "form", method: "createForm" },
            update: { service: this.serviceName, module: "form", method: "updateForm" },
            delete: { service: this.serviceName, module: "form", method: "deleteForm" }
        },
        record: {
            fetchAll: { service: this.serviceName, module: "record", method: "fetchAllRecords" },
            fetchById: { service: this.serviceName, module: "record", method: "fetchARecordById" },
            create: { service: this.serviceName, module: "record", method: "createRecord" },
            update: { service: this.serviceName, module: "record", method: "updateRecord" },
            delete: { service: this.serviceName, module: "record", method: "deleteRecord" }
        }
    }
}


//DTOs
export interface FormDTO {
    name: string;
    fields: FormFieldDTO[];
    attributes?: GenericObject;
    request: any
}

export interface FormUpdateDTO {
    formId: number;
    name?: string;
    fields?: FormFieldDTO[];
    attributes?: GenericObject;
    request: any
}

export interface FormFieldDTO {
    //need for update case
    id?: number;
    name: string;
    type: FieldTypeEnum;
    required: boolean;
    validationRegex?: string;
    arrayValues?: string[];
    attributes?: GenericObject;
    //need for update case
    markDeleted?: boolean;
}

export interface FormIdDTO {
    formId: number;
    request?: any;
}

export interface RecordDTO {
    formId: number;
    entry: any;
    attributes?: GenericObject;
    request: any;
}

export interface RecordUpdateDTO {
    formId: number;
    id: number;
    entry: any;
    attributes?: GenericObject;
    request: any;
}

export interface RecordIdDTO {
    formId: number;
    recordId: number;
}

export interface RecordSearchDTO extends FormIdDTO {
    searchOptions?: GenericObject;
    parentRecordId?: number;
}

export interface RecordDeleteDTO extends RecordIdDTO {
    newParentIdForChildren?: number;
}

export interface FormRelationDTO {
    id: number;
    formId: number;
    relationType: "one-to-one" | "many-to-one";
    children: FormRelationDTO[];
    parent: FormRelationDTO;
}