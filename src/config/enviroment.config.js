import {getSheetsFactory} from "../services/utils";
import {SHEET_METHOD} from "./constants.config";

export const SHEET_FACTORY = getSheetsFactory(SHEET_METHOD.GOOGLE_API).getSheetsService();