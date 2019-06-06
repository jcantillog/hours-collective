import React, {Component} from "react";
import Select from "react-select";
import chroma from "chroma-js";
/* Components */
import {
    Button,
    TextField
} from "@material-ui/core";
/* Style */
import "./style.css";
/* Services */
import GoogleSheetsService from "../../../services/GoogleSheetsService";
import {Paper, Typography} from "@material-ui/core";

class HoursRegister extends Component {
    state = {
        projects: [],
        selectedElement: null
    };
    GoogleSheets = new GoogleSheetsService();

    componentDidMount() {
        this.GoogleSheets.getProjects().then(response => this.setState({projects: response}));
    }

    render() {
        const { projects } = this.state;
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

        return <Paper style={{}} className="paper">
            <Typography component="h1" variant="h5" className="typography">
                Welcome, {localStorage.getItem("element")}
            </Typography>
            <Typography component="p" className="typography">
                Please, enter the number of hours worked
            </Typography>
            <Select className="|select-projects"
                    placeholder="Select a project..."
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="project"
                    options={projects}
                    styles={colourStyles}
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
            />
            <Button className="submit"
                    variant="contained"
                    color="primary">
                Enter hours
            </Button>
        </Paper>
    }
}

export default HoursRegister;