import { DefinitionResponseDTO, IdDTO, EntryResponseDTO, MSClient } from "..";
import { ILogger } from "../common.interface";
import { FormContractMessages, FormDTO, FormIdDTO, FormRelationDTO, FormUpdateDTO, IFormMethods, RecordDeleteDTO, RecordDTO, RecordIdDTO, RecordSearchDTO, RecordUpdateDTO } from "../contracts/form.contract";


/**
 * DAS microservice client. 
 * Consumers just need to inehrit this and pass in the constructor parameters and use the available functions in DAS microservice
 */
export class FormClient implements IFormMethods {
    private _MSClient: MSClient;
    private messages = new FormContractMessages();

    constructor(private clientProxy, private logger: ILogger, private timeout: number = 10000) {
        this._MSClient = new MSClient(this.clientProxy, this.logger, timeout);
    }

    async fetchAllForms(): Promise<DefinitionResponseDTO[]> {
        return this._MSClient.send(this.messages.modules.form.fetchAll, {});
    }

    async fetchFormDirectChildren(payload: FormIdDTO): Promise<number[]> {
        return this._MSClient.send(this.messages.modules.form.fetchFormDirectChildren, payload);
    }

    async fetchAllFormTrees(): Promise<FormRelationDTO[]> {
        return this._MSClient.send(this.messages.modules.form.fetchAllFormTrees, {});
    }

    async fetchFormById(payload: FormIdDTO): Promise<DefinitionResponseDTO> {
        return this._MSClient.send(this.messages.modules.form.fetchById, payload);
    }

    async createForm(payload: FormDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.form.create, payload);
    }

    async updateForm(payload: FormUpdateDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.form.update, payload);
    }

    async deleteForm(payload: FormIdDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.form.delete, payload);
    }

    async fetchAllRecords(payload: RecordSearchDTO): Promise<EntryResponseDTO[]> {
        return this._MSClient.send(this.messages.modules.record.fetchAll, payload);
    }

    async fetchARecordById(payload: RecordIdDTO): Promise<EntryResponseDTO> {
        return this._MSClient.send(this.messages.modules.record.fetchById, payload);
    }

    async createRecord(payload: RecordDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.record.create, payload);
    }

    async updateRecord(payload: RecordUpdateDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.record.update, payload);
    }

    async deleteRecord(payload: RecordDeleteDTO): Promise<IdDTO> {
        return this._MSClient.send(this.messages.modules.record.delete, payload);
    }
}