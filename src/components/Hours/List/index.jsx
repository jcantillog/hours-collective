import React, {Component} from "react";
import MaterialTable from 'material-table';
/* Style */
import "./style.css";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
/* Services */
import GoogleSheetsService from "../../../services/GoogleSheetsService";

class HoursList extends Component {
    constructor(props) {
        super(props);
        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#303f9f',
                },
            },

        });
    }

    state = {
        columns: [
            { title: 'Year', field: 'year', type: 'numeric' },
            { title: 'Month', field: 'month', type: 'numeric'},
            { title: 'Day', field: 'day', type: 'numeric' },
            { title: 'Hours', field: 'hours', type: 'numeric', grouping: false, filtering: false},
            { title: 'Elemento', field: 'element', sorting: false, grouping: false, filtering: false}
        ],
        options: {
            search: false,
            grouping: false,
            selection: true,
            sorting: true,
            filtering: true,
            selectionProps: rowData => ({
                color: 'primary'
            })
        },
        actions: [
            {
                tooltip: 'Remove all selected hours',
                icon: 'delete',
                onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            }
        ],
        localization: {
            pagination: {
                labelDisplayedRows: '{from}-{to} of {count}'
            },
            toolbar: {
                nRowsSelected: '{0} row(s) selected'
            },
            header: {
                actions: 'Actions'
            },
            body: {
                emptyDataSourceMessage: 'No hours to display',
                filterRow: {
                    filterTooltip: 'Filter'
                }
            }
        },
        data: []
    };

    componentDidMount() {
        GoogleSheetsService.getHoursList("Hours").then(response => this.setState({data: response}));
    }

    render() {
        const { columns, options, actions, localization, data } = this.state;
        return (
            <MuiThemeProvider theme={this.theme}>
                <MaterialTable
                    title="List of hours"
                    columns={columns}
                    data={data}
                    options={options}
                    actions={actions}
                    localization={localization}
                    /*editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...data];
                                    data.push(newData);
                                    this.setState({ data: data });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...data];
                                    data[data.indexOf(oldData)] = newData;
                                    this.setState({ data: data });
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...data];
                                    data.splice(data.indexOf(oldData), 1);
                                    this.setState({ data: data });
                                }, 600);
                            }),
                    }}*/
                />
            </MuiThemeProvider>
        )
    }
}

HoursList.propTypes = {
    // elemento: PropTypes.string.isRequired
};

export default HoursList;