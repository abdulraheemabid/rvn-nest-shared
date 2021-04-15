import { IDASMethods, DASContractMessages, DefinitionResponseDTO, DefinitionIdDTO, DefinitionNameDTO, DefinitionDTO, IdDTO, DefinitionUpdateDTO, EntryDTO, EntryIdDTO, EntryUpdateDTO, EntryResponseDTO } from "..";
import { ILogger } from "../common.interface";
import { MSClient } from "./ms-client";

export class DASClient implements IDASMethods {
    private _MSClient: MSClient;
    private messages = new DASContractMessages();

    constructor(private clientProxy, private logger: ILogger, private timeout: number = 10000) {
        this._MSClient = new MSClient(this.clientProxy, this.logger, timeout);
    }

    async fetchAllDefinitions(): Promise<DefinitionResponseDTO[]> {
        return this._MSClient.send(this.messages.modules.definition.fetchAll, {});
    }

    async fetchDefinitionById(payload: DefinitionIdDTO): Promise<DefinitionResponseDTO> {
        return this._MSClient.send(this.messages.modules.definition.fetchById, payload);
    }

    async fetchDefinitionsByName(payload: DefinitionNameDTO): Promise<DefinitionResponseDTO[]> {
        return this._MSClient.send(this.messages.modules.definition.fetchByName, payload);
    }

    async createDefinition(payload: DefinitionDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.definition.create, payload);
    }

    async updateDefinition(payload: DefinitionUpdateDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.definition.update, payload);
    }

    async deleteDefinition(payload: DefinitionIdDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.definition.delete, payload);
    }

    async fetchAllEntries(payload: DefinitionIdDTO): Promise<EntryResponseDTO[]> {
        return this._MSClient.send(this.messages.modules.entry.fetchAll, payload);
    }

    async fetchEntryById(payload: EntryIdDTO): Promise<EntryResponseDTO> {
        return this._MSClient.send(this.messages.modules.entry.fetchById, payload);
    }

    async createEntry(payload: EntryDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.entry.create, payload);
    }

    async updateEntry(payload: EntryUpdateDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.entry.update, payload);
    }

    async deleteEntry(payload: EntryIdDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.entry.delete, payload);
    }
}