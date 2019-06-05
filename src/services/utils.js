import React from "react";
import {Redirect, Route} from "react-router-dom";
import {GOOGLE_API_KEY, CLIENT_ID} from "../config/constants.config";

const gapi = window.gapi;
const googleSheetsConfig = {
    apiKey: GOOGLE_API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets"
};

/**
 * Inits the google APIs client with Google Sheets Config
 */
export const initClient = (config = googleSheetsConfig) => {
    return new Promise((resolve, reject) => {
        load(config).then(() => {
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
const load = config => {
    return new Promise((resolve, reject) => {
        gapi.load("client:auth2", () => {
            gapi.client.init(config).then(() => resolve());
        });
    });
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
