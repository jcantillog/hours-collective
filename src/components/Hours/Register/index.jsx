/* Basic */
import React, {Component} from "react";
import Select from "react-select";
import chroma from "chroma-js";
import PropTypes from "prop-types";
/* Animations */
import { fadeInDown } from 'react-animations';
/* Components */
import {
    Button,
    TextField,
    CircularProgress,
    Fab,
    Snackbar,
    Paper,
    Typography
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import SnackbarContentWrapper from '../../UI/Snackbar';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
/* Services */
import { isValidDate } from "../../../services/utils";
import {SHEET_FACTORY} from "../../../config/enviroment.config";
/* Style */
import "./style.css";
import styled, { keyframes } from 'styled-components';
import AnimationContainer from "../../UI/AnimationContainer";

const bounceAnimation = keyframes`${fadeInDown}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

class HoursRegister extends Component {
    state = {
        projects: [],
        selectedProject: null,
        hoursWorked: null,
        selectedDate: new Date(),
        loading: false,
        success: false,
        openSnack: false,
        successMessage: ""
    };

    componentDidMount() {
        SHEET_FACTORY
            .getProjects("Register")
            .then(response => this.setState({projects: response}));
    }

    render() {
        const { projects, selectedProject, hoursWorked, selectedDate, loading, success, openSnack, successMessage } = this.state;
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

        return <AnimationContainer title={`Welcome, ${elemento}`}
                                   description={`Please, enter the number of hours worked`}
                                   projectColor={selectedProject ? selectedProject.color : 'white'}>
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
                    value={selectedProject}
                    onChange={(project) => this.handlerProjectSelect(project ? project : null)}
            />
            <div className="hours-day">
                <TextField
                    className="hours-day-item"
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
                    value={hoursWorked ? hoursWorked : ""}
                    onChange={(hours) => this.handlerHoursWorked(hours.target.value)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className="hours-day-item"
                        margin="normal"
                        label="Day worked"
                        value={selectedDate}
                        onChange={(date) => this.handlerDateChange(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
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
                <div className={`submit ${loading ? 'submit-gone' : ''}`}>
                    <Button variant="contained"
                            color="primary"
                            disabled={!selectedProject || !hoursWorked || !selectedDate || loading}
                            onClick={() => this.handlerHoursSubmit(selectedProject, hoursWorked, selectedDate, elemento)}>
                        Enter hours
                        {loading && <CircularProgress size={24} className="spinner"/>}
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={openSnack}
                        autoHideDuration={3000}
                        onClose={this.handlerSnackbarClose}
                    >
                        <SnackbarContentWrapper
                            variant="success"
                            onClose={this.handlerSnackbarClose}
                            message={successMessage}
                        />
                    </Snackbar>
                </div>
            )}
        </AnimationContainer>
    }

    handlerProjectSelect = (project) => this.setState({ selectedProject: project });

    handlerHoursWorked = (hours) => this.setState({ hoursWorked: (hours !== "" ? hours : null) });

    handlerDateChange = (date) => this.setState({ selectedDate: (isValidDate(date) ? date : null) });

    handlerHoursSubmit = (selectedProject, hoursWorked, selectedDate, elemento) => {
        console.log();
        this.setState({ loading: true });
        SHEET_FACTORY
            .addSingleRegistry({
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth()+1,
                day: selectedDate.getDate(),
                project: selectedProject.label,
                hours: hoursWorked,
                element: elemento
            }).then(() => {
                this.setState({ successMessage: `Hey ${elemento}, you've registered ${hoursWorked} hours with ${selectedProject.label}` });
                this.setState({ success: true });
                this.setState({ openSnack: true });
                setTimeout(() => {
                    this.handlerReset();
                }, 1500);
            });
    };

    handlerReset = () => {
        this.setState({ success: false });
        this.setState({ loading: false });
        this.setState({ hoursWorked: null });
        this.setState({ selectedProject: null });
    };

    handlerSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };
}

HoursRegister.propTypes = {
    elemento: PropTypes.string.isRequired
};

export default HoursRegister;