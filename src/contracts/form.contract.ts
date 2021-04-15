import { FieldTypeEnum } from "../common.enums";
import { IContractMessages } from "../common.interface";
import { DefinitionResponseDTO, EntryResponseDTO, IdDTO } from "../contracts/das.contract";

export interface IFormMethods {
    fetchAllForms(): Promise<DefinitionResponseDTO[]>;
    fetchFormById(formDTO: FormIdDTO): Promise<DefinitionResponseDTO>;
    createForm(formDTO: FormDTO): Promise<IdDTO>;
    updateForm(formDTO: FormUpdateDTO): Promise<IdDTO>;
    deleteForm(formDTO: FormIdDTO): Promise<IdDTO>;

    fetchAllRecords(formDTO: FormIdDTO): Promise<EntryResponseDTO[]>;
    fetchARecordById(entryDto: RecordIdDTO): Promise<EntryResponseDTO>;
    createRecord(entryDto: RecordDTO): Promise<IdDTO>;
    updateRecord(entryDto: RecordUpdateDTO): Promise<IdDTO>;
    deleteRecord(entryDto: RecordIdDTO): Promise<IdDTO>;
}

// All meesages used for the methods in DAS Service 
export class FormContractMessages implements IContractMessages {
    readonly serviceName = "form";
    readonly modules = {
        form: {
            fetchAll: { service: this.serviceName, module: "form", method: "fetchAllForms" },
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
    attributes?: JSON;
    request: any
}

export interface FormUpdateDTO {
    formId: number;
    name?: string;
    fields?: FormFieldDTO[];
    attributes?: JSON;
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
    attributes?: JSON;
    //need for update case
    markDeleted?: boolean;
}

export interface FormIdDTO {
    formId: number;
}

export interface RecordDTO {
    formId: number;
    entry: any;
    attributes?: JSON;
    request: any;
}

export interface RecordUpdateDTO {
    formId: number;
    id: number;
    entry: any;
    attributes?: JSON;
    request: any;
}

export interface RecordIdDTO {
    formId: number;
    recordId: number;
}
