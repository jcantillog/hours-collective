import {GoogleSheetsFactory} from "./GoogleSheetsFactory";

export const sheetMethod = {
    GOOGLE_API: 'GAPI'
};

export class SheetsFactory {
    constructor(){
        if (this.constructor === SheetsFactory){
            throw new TypeError('Abstract class "SheetsFactory" cannot be instantiated directly.')
        }

        if (this.getSheetsService === undefined) {
            throw new TypeError('Classes extending the SheetsFactory abstract class must override getProjects method.');
        }
    }

    static getSheetsFactory(method){
        switch (method) {
            case sheetMethod.GOOGLE_API:
                return new GoogleSheetsFactory();
        }
    }
}