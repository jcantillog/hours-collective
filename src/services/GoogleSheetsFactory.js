import {SheetsFactory} from "./SheetsFactory";
import { GoogleSheetsService } from "./GoogleSheetsService";

export class GoogleSheetsFactory extends SheetsFactory{
    constructor(){
        super();
    }

    getSheetsService(){
        return new GoogleSheetsService();
    }
}