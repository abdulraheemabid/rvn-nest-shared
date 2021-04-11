import { HttpVerbs } from "../utils/http/verbs";

export class DASContract {
    public static readonly serviceName = "das";
    public static readonly serviceFullName = "rvn-ms-das";

    private static readonly _endpoints = {
        fetchAllDefinitions: {
            module: "definition",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.GET, route: "definitions" },
            inputObjectType: "null",
            outputObjectType: "DefinitionDTO"
        },
        fetchDefinitionById: {
            module: "definition",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.GET, route: "definitions/:id" },
            inputObjectType: "DefinitionIdDTO",
            outputObjectType: "DefinitionResponseDTO"
        },
        createDefinition: {
            module: "definition",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.POST, route: "definitions" },
            inputObjectType: "DefinitionDTO",
            outputObjectType: "IdDTO"
        },
        updateDefinition: {
            module: "definition",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.PATCH, route: "definitions/:id" },
            inputObjectType: "DefinitionUpdateDTO",
            outputObjectType: "IdDTO"
        },
        deleteDefinition: {
            module: "definition",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.DELETE, route: "definitions/:id" },
            inputObjectType: "DefinitionIdDTO",
            outputObjectType: "IdDTO"
        },
        fetchAllEntries: {
            module: "entry",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.GET, route: "definitions/:defid/entries" },
            inputObjectType: "DefinitionIdDTO",
            outputObjectType: "EntryDTO"
        },
        fetchEntryById: {
            module: "entry",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.GET, route: "definitions/:defid/entries/:id" },
            inputObjectType: "EntryIdInputDTO",
            outputObjectType: "EntryDTO"
        },
        createEntry: {
            module: "entry",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.POST, route: "definitions/:defid/entries" },
            inputObjectType: "EntryDTO",
            outputObjectType: "IdDTO"
        },
        updateEntry: {
            module: "entry",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.PATCH, route: "definitions/:defid/entries/:id" },
            inputObjectType: "EntryUpdateDTO",
            outputObjectType: "IdDTO"
        },
        deleteEntry: {
            module: "entry",
            pattern: { service: DASContract.serviceName, method: HttpVerbs.DELETE, route: "definitions/:defid/entries/:id" },
            inputObjectType: "EntryIdInputDTO",
            outputObjectType: "IdDTO"
        }

    }

    public static getAllEndpointContracts() {
        return this._endpoints;
    }

    public static getEndpointContractByName(name: DASEndpointNames) {
        return this._endpoints[name];
    }
}

export class DefinitionDTO {
    id?: number;
    name: string;
    fields?: FieldDTO[];
    attributes?: JSON
    request: any
    definitionId?: number
}

export class DefinitionUpdateDTO {
    id?: number;
    name?: string;
    fields?: FieldDTO[];
    attributes?: JSON
    request: any
    definitionId: number
}

export class DefinitionIdDTO {
    definitionId: number
}

export class IdDTO {
    id: number;
}

export class DefinitionResponseDTO {
    name: string;
    fields?: {
        name: string;
        type: string;
        required: boolean;
        attributes?: JSON;
        validationRegex?: string;
        arrayValues?: string[];
    }[];
}

export class EntryDTO {
    id?: number;
    entry: any;
    definitionId: number;
    attributes?: JSON
    request: any;
}

export class EntryUpdateDTO {
    id: number;
    entry: any;
    definitionId: number;
    attributes?: JSON
    request: any;
}

export class EntryIdInputDTO {
    id: number;
    definitionId: number;
}

export class FieldDTO {
    id?: number;
    name: string;
    type?: string;
    required?: boolean;
    validationRegex?: string;
    arrayValues?: string[];
    markDeleted?: boolean;
}

export enum DASEndpointNames {
    FETCH_ALL_DEFINITIONS = "fetchAllDefinitions",
    FETCH_DEFINITION_BY_ID = "fetchDefinitionById",
    CREATE_DEFINITION = "createDefinition",
    UPDATE_DEFINITION = "updateDefinition",
    DELETE_DEFINITION = "deleteDefinition",
    FETCH_ALL_ENTRIES = "fetchAllEntries",
    FETCH_ENTRY_BY_ID = "fetchEntryById",
    CREATE_ENTRY = "createEntry",
    UPDATE_ENTRY = "updateEntry",
    DELETE_ENTRY = "deleteEntry",
}
