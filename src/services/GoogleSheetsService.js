import {CLIENT_ID, GOOGLE_API_KEY, SPREADSHEET_ID} from "../config/constants.config";
import {parseValueToData, parseValueToSheet} from "./utils";
import { SheetsService } from "./SheetsService";

const gapi = window.gapi;
const googleSheetsConfig = {
    apiKey: GOOGLE_API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets"
};

export class GoogleSheetsService extends SheetsService{

    constructor(){
        super();
    }

    /**
     * Inits the google APIs client with Google Sheets Config
     */
    initClient = (config = googleSheetsConfig) => {
        return new Promise((resolve, reject) => {
            this.load(config).then(() => {
                const interfaceAPI = {
                    read: gapi.client.sheets.spreadsheets.values.get,
                    append: gapi.client.sheets.spreadsheets.values.append
                };

                // Check out if exits a active session
                if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    resolve(
                        interfaceAPI,
                        gapi.auth2
                            .getAuthInstance()
                            .currentUser.get()
                            .getBasicProfile()
                    );
                } else {
                    gapi.auth2.getAuthInstance().signIn();
                }

                // Adds an event listener to resolve the promise when the user sign-in
                gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
                    if (!isSignedIn) reject();

                    resolve(
                        interfaceAPI,
                        gapi.auth2
                            .getAuthInstance()
                            .currentUser.get()
                            .getBasicProfile()
                    );
                });
            });
        });
    };

    /**
     * Loads the initial config to use google sheets API
     * @param {Object} config
     */
    load = config => {
        return new Promise((resolve, reject) => {
            gapi.load("client:auth2", () => {
                gapi.client.init(config).then(() => resolve());
            });
        });
    };

    /* ---------------------- Override --------------------------- */

    /**
     * Function that returns the projects stored in Google Sheets DB
     */
    getProjects() {
        const sheetName = "Projects";
        const range = "A2:C4";

        return this.initClient().then(googleInstance =>
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
    getElements() {
        const sheetName = "Elements";
        const range = "A2:C4";

        return this.initClient().then(googleInstance =>
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
    getHoursList() {
        const sheetName = "Hours";
        const range = "A1:F";

        return this.initClient().then(googleInstance =>
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

        return this.initClient().then(googleInstance =>
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
