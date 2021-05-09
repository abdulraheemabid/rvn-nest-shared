

// Methods available in DAS Service

import { BaseResponseDTO, GenericObject, IContractMessages } from "../common.interface";

export interface IDASMethods {
    fetchAllDefinitions(): Promise<DefinitionResponseDTO[]>;
    fetchDefinitionById(definitionDTO: DefinitionIdDTO): Promise<DefinitionResponseDTO>;
    fetchDefinitionsByName(defName: DefinitionNameDTO): Promise<DefinitionResponseDTO[]>;
    createDefinition(definitionDTO: DefinitionDTO): Promise<IdDTO>;
    updateDefinition(definitionDTO: DefinitionUpdateDTO): Promise<IdDTO>;
    deleteDefinition(definitionDTO: DefinitionIdDTO): Promise<IdDTO>;

    fetchAllEntries(entrySearchDTO: EntrySearchDTO): Promise<EntryResponseDTO[]>;
    fetchEntryById(entryDto: EntryIdDTO): Promise<EntryResponseDTO>;
    createEntry(entryDto: EntryDTO): Promise<IdDTO>;
    updateEntry(entryDto: EntryUpdateDTO): Promise<IdDTO>;
    deleteEntry(entryDto: EntryIdDTO): Promise<IdDTO>;
}

// All meesages used for the methods in DAS Service 
export class DASContractMessages implements IContractMessages {
    readonly serviceName = "das";
    readonly modules = {
        definition: {
            fetchAll: { service: this.serviceName, module: "definition", method: "fetchAllDefinitions" },
            fetchById: { service: this.serviceName, module: "definition", method: "fetchDefinitionById" },
            fetchByName: { service: this.serviceName, module: "definition", method: "fetchDefinitionsByName" },
            create: { service: this.serviceName, module: "definition", method: "createDefinition" },
            update: { service: this.serviceName, module: "definition", method: "updateDefinition" },
            delete: { service: this.serviceName, module: "definition", method: "deleteDefinition" }
        },
        entry: {
            fetchAll: { service: this.serviceName, module: "entry", method: "fetchAllEntries" },
            fetchById: { service: this.serviceName, module: "entry", method: "fetchEntryById" },
            create: { service: this.serviceName, module: "entry", method: "createEntry" },
            update: { service: this.serviceName, module: "entry", method: "updateEntry" },
            delete: { service: this.serviceName, module: "entry", method: "deleteEntry" }
        }
    }
}


// DTOs

export interface DefinitionDTO {
    id?: number;
    name: string;
    fields?: FieldDTO[];
    attributes?: GenericObject;
    request: any;
    definitionId?: number;
}

export interface DefinitionUpdateDTO {
    id?: number;
    name?: string;
    fields?: FieldDTO[];
    attributes?: GenericObject
    request: any
    definitionId: number
}

export interface DefinitionIdDTO {
    definitionId: number,
    request?: any
}

export interface DefinitionNameDTO {
    name: string;
    request?: any
}

export interface IdDTO {
    id: number;
}

export interface DefinitionResponseDTO extends BaseResponseDTO {
    id: number;
    name: string;
    fields?: FieldResponseDTO[];
    attributes?: GenericObject;
}

export interface FieldResponseDTO extends BaseResponseDTO {
    id: number,
    name: string;
    type: string;
    required: boolean;
    attributes?: GenericObject;
    validationRegex?: string;
    arrayValues?: string[];
}

export interface EntryDTO {
    id?: number;
    entry: any;
    definitionId: number;
    attributes?: GenericObject
    request: any;
}

export interface EntryUpdateDTO {
    id: number;
    entry: any;
    definitionId: number;
    attributes?: GenericObject
    request: any;
}

export interface EntryIdInputDTO {
    id: number;
    definitionId: number;
    request?: any
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
    request?: any
}

export interface EntryResponseDTO extends BaseResponseDTO {
    id?: number;
    entry: any;
    attributes?: GenericObject
}

export interface EntrySearchDTO extends DefinitionIdDTO {
    searchOptions: GenericObject;
}