import {SPREADSHEET_ID} from "../config/constants.config";
import {initClient, parseValueToData, parseValueToSheet} from "./utils";

class GoogleSheetsService {
    init(test) {
        return initClient(test);
    }

    /**
     * Function that returns the projects stored in Google Sheets DB
     */
    getProjects(test) {
        const sheetName = "Projects";
        const range = "A2:C4";

        return this.init(test).then(googleInstance =>
            googleInstance
                .read({spreadsheetId: SPREADSHEET_ID, range: `${sheetName}!${range}`})
                .then(response => {
                    return parseValueToData(response.result.values, 'projects');
                })
        );
    }

    /**
     * Function that returns the elements stored in Google Sheets DB
     */
    getElements(test) {
        const sheetName = "Elements";
        const range = "A2:C4";

        return this.init().then(googleInstance =>
            googleInstance
                .read({spreadsheetId: SPREADSHEET_ID, range: `${sheetName}!${range}`})
                .then(response => {
                    return parseValueToData(response.result.values, 'elements');
                })
        );
    }

    /**
     * Function that returns the hours list stored in Google Sheets DB
     */
    getHoursList(test) {
        const sheetName = "Hours";
        const range = "A1:F";

        return this.init(test).then(googleInstance =>
            googleInstance
                .read({spreadsheetId: SPREADSHEET_ID, range: `${sheetName}!${range}`})
                .then(response => {
                    return parseValueToData(response.result.values ? response.result.values : [], 'hours');
                })
        );
    }

    /**
     * Function that add a new row with hours in Google Sheets DB
     * @param newRegistry Object of values to be added
     */
    addSingleRegistry(newRegistry) {
        const sheetsData = parseValueToSheet([newRegistry], "registries");
        const sheetName = "Hours";

        return this.init().then(googleInstance =>
            googleInstance.append(
                {
                    spreadsheetId: SPREADSHEET_ID,
                    range: sheetName,
                    valueInputOption: "RAW",
                    insertDataOption: "INSERT_ROWS"
                },
                {values: sheetsData}
            )
        );
    }
}

export default new GoogleSheetsService()
