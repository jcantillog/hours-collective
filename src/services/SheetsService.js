export class SheetsService {
    constructor(){
        if (this.constructor === SheetsService){
            throw new TypeError('Abstract class "SheetsService" cannot be instantiated directly.')
        }

        if (this.getProjects === undefined) {
            throw new TypeError('Classes extending the SheetsService abstract class must override getProjects method.');
        }
        if (this.getProjects === undefined) {
            throw new TypeError('Classes extending the SheetsService abstract class must override getProjects method.');
        }
        if (this.getElements === undefined) {
            throw new TypeError('Classes extending the SheetsService abstract class must override getElements method.');
        }
        if (this.getHoursList === undefined) {
            throw new TypeError('Classes extending the SheetsService abstract class must override getHoursList method.');
        }
        if (this.addSingleRegistry === undefined) {
            throw new TypeError('Classes extending the SheetsService abstract class must override addSingleRegistry method.');
        }
    }
}