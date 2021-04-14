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

export interface DefinitionController {
    fetchAll(): Promise<DefinitionResponseDTO[]>;
    fetchById(definitionDTO: DefinitionIdDTO): Promise<DefinitionResponseDTO>;
    fetchByName(defName: DefinitionNameDTO): Promise<DefinitionResponseDTO[]>;
    create(definitionDTO: DefinitionDTO): Promise<IdDTO>;
    update(definitionDTO: DefinitionUpdateDTO): Promise<IdDTO>;
    delete(definitionDTO: DefinitionIdDTO): Promise<IdDTO>;
}

export interface EntryController {
    fetchAll(definitionDTO: DefinitionIdDTO): Promise<EntryDTO[]>;
    fetchById(entryDto: EntryIdDTO): Promise<EntryDTO>;
    create(entryDto: EntryDTO): Promise<IdDTO>;
    update(entryDto: EntryUpdateDTO): Promise<IdDTO>;
    delete(entryDto: EntryIdDTO): Promise<IdDTO>;
}

export interface DefinitionDTO {
    id?: number;
    name: string;
    fields?: FieldDTO[];
    attributes?: JSON
    request: any
    definitionId?: number
}

export interface DefinitionUpdateDTO {
    id?: number;
    name?: string;
    fields?: FieldDTO[];
    attributes?: JSON
    request: any
    definitionId: number
}

export interface DefinitionIdDTO {
    definitionId: number
}

export interface DefinitionNameDTO {
    name: string
}

export interface IdDTO {
    id: number;
}

export interface DefinitionResponseDTO {
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

export interface EntryDTO {
    id?: number;
    entry: any;
    definitionId: number;
    attributes?: JSON
    request: any;
}

export interface EntryUpdateDTO {
    id: number;
    entry: any;
    definitionId: number;
    attributes?: JSON
    request: any;
}

export interface EntryIdInputDTO {
    id: number;
    definitionId: number;
}

export interface FieldDTO {
    id?: number;
    name: string;
    type?: string;
    required?: boolean;
    validationRegex?: string;
    arrayValues?: string[];
    markDeleted?: boolean;
}

export interface EntryIdDTO {
    id: number;
    definitionId: number;
}