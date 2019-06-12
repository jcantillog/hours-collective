import React, {Component} from "react";
import MaterialTable from 'material-table';
/* Style */
import "./style.css";
/* Services */
import GoogleSheetsService from "../../../services/GoogleSheetsService";

class HoursList extends Component {
    state = {
        columns: [
            { title: 'Year', field: 'year', type: 'numeric' },
            { title: 'Month', field: 'month', type: 'numeric'},
            { title: 'Day', field: 'day', type: 'numeric' },
            { title: 'Hours', field: 'hours', type: 'numeric' },
            { title: 'Elemento', field: 'element' }
        ],
        data: []
    };

    componentDidMount() {
        GoogleSheetsService.getHoursList().then(response => this.setState({data: response}));
    }

    render() {
        const { columns, data } = this.state;
        return (
            <MaterialTable
                title="List of hours"
                columns={columns}
                data={data}
                editable={{
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
                }}
            />
        )
    }
}

HoursList.propTypes = {
    // elemento: PropTypes.string.isRequired
};

export default HoursList;