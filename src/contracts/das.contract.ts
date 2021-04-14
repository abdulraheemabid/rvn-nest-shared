import { IContractMessages } from "./IContract";

// Methods available in DAS Service

export interface IDASMethods {
    fetchAllDefinitions(): Promise<DefinitionResponseDTO[]>;
    fetchDefinitionById(definitionDTO: DefinitionIdDTO): Promise<DefinitionResponseDTO>;
    fetchDefinitionByName(defName: DefinitionNameDTO): Promise<DefinitionResponseDTO[]>;
    createDefinition(definitionDTO: DefinitionDTO): Promise<IdDTO>;
    updateDefinition(definitionDTO: DefinitionUpdateDTO): Promise<IdDTO>;
    deleteDefinition(definitionDTO: DefinitionIdDTO): Promise<IdDTO>;

    fetchAllEntries(definitionDTO: DefinitionIdDTO): Promise<EntryDTO[]>;
    fetchEntryById(entryDto: EntryIdDTO): Promise<EntryDTO>;
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
            fetchByName: { service: this.serviceName, module: "definition", method: "fetchDefinitionByName" },
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