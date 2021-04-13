import { IContract } from "./IContract";


export class DASContract implements IContract {
    readonly serviceName = "das";
    readonly modules = {
        definition: {
            fetchAll: { service: this.serviceName, module: "definition", method: "fetchAll" },
            fetchById: { service: this.serviceName, module: "definition", method: "fetchById" },
            fetchByName: { service: this.serviceName, module: "definition", method: "fetchByName" },
            create: { service: this.serviceName, module: "definition", method: "create" },
            update: { service: this.serviceName, module: "definition", method: "update" },
            delete: { service: this.serviceName, module: "definition", method: "delete" }
        },
        entry: {
            fetchAll: { service: this.serviceName, module: "entry", method: "fetchAll" },
            fetchById: { service: this.serviceName, module: "entry", method: "fetchById" },
            create: { service: this.serviceName, module: "entry", method: "create" },
            update: { service: this.serviceName, module: "entry", method: "update" },
            delete: { service: this.serviceName, module: "entry", method: "delete" }
        }
    }
}

export interface IDefinitionController {
    fetchAll(): Promise<IDefinitionResponseDTO[]>;
    fetchById(definitionDTO: IDefinitionIdDTO): Promise<IDefinitionResponseDTO>;
    fetchByName(defName: IDefinitionNameDTO): Promise<IDefinitionResponseDTO[]>;
    create(definitionDTO: IDefinitionDTO): Promise<IIdDTO>;
    update(definitionDTO: IDefinitionUpdateDTO): Promise<IIdDTO>;
    delete(definitionDTO: IDefinitionIdDTO): Promise<IIdDTO>;
}

export interface IEntryController {
    fetchAll(definitionDTO: IDefinitionIdDTO): Promise<IEntryDTO[]>;
    fetchById(entryDto: IEntryIdDTO): Promise<IEntryDTO>;
    create(entryDto: IEntryDTO): Promise<IIdDTO>;
    update(entryDto: IEntryUpdateDTO): Promise<IIdDTO>;
    delete(entryDto: IEntryIdDTO): Promise<IIdDTO>;
}

export interface IDefinitionDTO {
    id?: number;
    name: string;
    fields?: IFieldDTO[];
    attributes?: JSON
    request: any
    definitionId?: number
}

export interface IDefinitionUpdateDTO {
    id?: number;
    name?: string;
    fields?: IFieldDTO[];
    attributes?: JSON
    request: any
    definitionId: number
}

export interface IDefinitionIdDTO {
    definitionId: number
}

export interface IDefinitionNameDTO {
    name: string
}

export interface IIdDTO {
    id: number;
}

export interface IDefinitionResponseDTO {
    id: number;
    name: string;
    fields?: {
        id: number,
        name: string;
        type: string;
        required: boolean;
        attributes?: JSON;
        validationRegex?: string;
        arrayValues?: string[];
    }[];
}

export interface IEntryDTO {
    id?: number;
    entry: any;
    definitionId: number;
    attributes?: JSON
    request: any;
}

export interface IEntryUpdateDTO {
    id: number;
    entry: any;
    definitionId: number;
    attributes?: JSON
    request: any;
}

export interface IEntryIdInputDTO {
    id: number;
    definitionId: number;
}

export interface IFieldDTO {
    id?: number;
    name: string;
    type?: string;
    required?: boolean;
    validationRegex?: string;
    arrayValues?: string[];
    markDeleted?: boolean;
}

export interface IEntryIdDTO {
    id: number;
    definitionId: number;
}