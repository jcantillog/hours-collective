import { SheetsFactory } from "./SheetsFactory";
import { GoogleSheetsService } from "../GoogleSheetsService";
import {SheetsService} from "../SheetsService";

export class GoogleSheetsFactory implements SheetsFactory{

    private readonly sheetsService: SheetsService;

    constructor(){
        this.sheetsService = new GoogleSheetsService();
    }

    getSheetsService(){
        return this.sheetsService;
    }
}