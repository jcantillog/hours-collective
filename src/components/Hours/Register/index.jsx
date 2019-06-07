import React, {Component} from "react";
import Select from "react-select";
import chroma from "chroma-js";
import PropTypes from "prop-types";
/* Components */
import {
    Button,
    TextField,
    CircularProgress,
    Fab
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
/* Style */
import "./style.css";
/* Services */
import GoogleSheetsService from "../../../services/GoogleSheetsService";
import {Paper, Typography} from "@material-ui/core";

class HoursRegister extends Component {
    state = {
        projects: [],
        selectedProject: null,
        hoursWorked: null,
        loading: false,
        success: false
    };
    GoogleSheets = new GoogleSheetsService();

    componentDidMount() {
        this.GoogleSheets.getProjects().then(response => this.setState({projects: response}));
    }

    render() {
        const { projects, selectedProject, hoursWorked, loading, success } = this.state;
        const { elemento } = this.props;
        const dot = (color = '#ccc') => ({
            alignItems: 'center',
            display: 'flex',

            ':before': {
                backgroundColor: color,
                borderRadius: 10,
                content: '" "',
                display: 'block',
                marginRight: 8,
                height: 10,
                width: 10,
            },
        });
        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                            ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
                            : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                    },
                };
            },
            input: styles => ({ ...styles, ...dot() }),
            placeholder: styles => ({ ...styles, ...dot() }),
            singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
        };

        return <Paper style={{ border: `1px solid ${selectedProject ? selectedProject.color : 'white'}` }}
                      className="paper">
            <Typography component="h1" variant="h5" className="typography">
                Welcome, {elemento}
            </Typography>
            <Typography component="p" className="typography">
                Please, enter the number of hours worked
            </Typography>
            <Select className="select-projects"
                    placeholder="Select a project..."
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="project"
                    options={projects}
                    styles={colourStyles}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#303f9f',
                        },
                    })}
                    onChange={(project) => this.handlerProjectSelect(project ? project : null)}
            />
            <TextField
                className="hours"
                label="Hours"
                type="number"
                placeholder="Number of hours worked"
                helperText="Try to enter whole values, please!"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(hours) => this.handlerHoursWorked(hours.target.value)}
            />
            {success ? (
                <Fab
                    aria-label="success"
                    color="primary"
                    className="submit-success"
                    style={{ backgroundColor: selectedProject.color }}
                >
                    <CheckIcon />
                </Fab>
            ) : (
                <Button className={`submit ${loading ? 'submit-gone' : ''}`}
                        variant="contained"
                        color="primary"
                        disabled={!selectedProject || !hoursWorked || loading}
                        onClick={() => this.handlerHoursSubmit(selectedProject, hoursWorked, elemento)}>
                    Enter hours
                    {loading && <CircularProgress size={24} className="spinner"/>}
                </Button>
            )}
        </Paper>
    }

    handlerProjectSelect = (project) => this.setState({ selectedProject: project });

    handlerHoursWorked = (hours) => this.setState({ hoursWorked: (hours !== "" ? hours : null) });

    handlerHoursSubmit = (selectedProject, hoursWorked, elemento) => {
        this.setState({ loading: true });
        setTimeout(() => {
            console.log(`The elemento ${elemento} has entered ${hoursWorked} hours to ${selectedProject.label}`);
            this.setState({ success: true });
            setTimeout(() => {
                this.setState({ success: false });
                this.setState({ loading: false });
                console.log("TODO FALSE");
            }, 1500);
        }, 1500);
    };
}

HoursRegister.propTypes = {
    elemento: PropTypes.string.isRequired
};

export default HoursRegister;