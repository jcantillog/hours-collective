import { SPREADSHEET_ID } from "../config/constants.config";
import { initClient, parseValueToData, parseValueToSheet } from "./utils";

export class GoogleSheetsService {
  init() {
    return initClient();
  }

  /**
   * Functions that returns the projects in Google Sheets DB
   */
  getProjects() {
    const sheetName = "DB";
    const range = "E1:E";

    return this.init().then(googleInstance =>
      googleInstance
        .read({ spreadsheetId: SPREADSHEET_ID, range: `${sheetName}!${range}` })
        .then(response => {
          return parseValueToData(response.result.values);
        })
    );
  }

  addSingleRegistry(newRegistry) {
    const sheetsData = parseValueToSheet([newRegistry], "registries");
    const sheetName = "Horas";

    return this.init().then(googleInstance =>
      googleInstance.append(
        {
          spreadsheetId: SPREADSHEET_ID,
          range: sheetName,
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS"
        },
        { values: sheetsData }
      )
    );
  }
}

export default GoogleSheetsService;
