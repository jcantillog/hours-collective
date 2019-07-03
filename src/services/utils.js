import React from "react";
import {Redirect, Route} from "react-router-dom";
import {GoogleSheetsFactory} from "./Factories/GoogleSheetsFactory";
import {SHEET_METHOD} from "../config/constants.config";

/**
 * Returns the factory in charge of set the selected sheets enviroment
 * Data model
 * @param {String} method
 */
export const getSheetsFactory = (method) => {
    switch (method) {
        case SHEET_METHOD.GOOGLE_API:
            return new GoogleSheetsFactory();
        default:
            return new GoogleSheetsFactory();
    }
};

/**
 * Parses the array value response from Google Sheets API to
 * Data model
 * @param {Array} values
 * @param {String} type
 */
export const parseValueToData = (values, type) => {
    switch (type) {
        case "projects":
            return values.map((project, index) => ({value: project[0], label: project[1], color: project[2]}) );

        case "elements":
            return values.map((element, index) => ({value: element[1], label: `${element[0]} - ( ${element[1]} )`}) );

        case "hours":
            return values.map((hour, index) => ({year: hour[0], month: hour[1], day: hour[2], project: hour[3], hours: hour[4], element: hour[5]}) );

        default:
            return values;
    }
};

/**
 * Parses the array value response from Data model to Google Sheets API
 * @param {Array} values
 * @param {String} type
 */
export const parseValueToSheet = (values, type) => {
    switch (type) {
        case "registries":
            return values.map(registry => [
                registry.year,
                registry.month,
                registry.day,
                registry.project,
                registry.hours,
                registry.element
            ]);

        default:
            return values;
    }
};

/**
 * Redirect to login if no authenticated
 */
export const PrivateRoute = ({component: Component, redirectTo, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            redirectTo === "/login" ? (
                localStorage.getItem("element") ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectTo,
                            state: {from: props.location}
                        }}
                    />
                )
            ) : redirectTo === "/" && (
                localStorage.getItem("element") ? (
                    <Redirect
                        to={{
                            pathname: redirectTo,
                            state: {from: props.location}
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            )}
    />
);

/**
 * Return if a date is valid or not
 * @param date to be validated
 */
export const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
};
