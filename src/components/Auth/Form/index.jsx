import React, {Component} from "react";
import { withRouter } from 'react-router-dom';

import {
    Avatar,
    Button,
    FormControl,
    Paper,
    Typography
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Select from "react-select";

/* Style */
import "./style.css";
/* Services */
import {sheetMethod, SheetsFactory} from "../../../services/Factories/SheetsFactory";

class AuthForm extends Component {
    state = {
        elements: [],
        selectedElement: null
    };

    componentDidMount() {
        SheetsFactory
            .getSheetsFactory(sheetMethod.GOOGLE_API)
            .getSheetsService()
            .getElements()
            .then(response => this.setState({elements: response}));
    }

    render() {
        const {elements, selectedElement} = this.state;
        return <Paper className="paper">
            <Avatar className="avatar">
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Hours Collective
            </Typography>
            <form className="form">
                <FormControl margin="normal" fullWidth>
                    <Select
                        className="select-input"
                        placeholder="Select an element..."
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        name="element"
                        options={elements}
                        onChange={(element) => this.handlerElementSelect(element ? element.value : null)}
                        required
                    />
                </FormControl>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                    disabled={!selectedElement}
                    onClick={() => this.handlerSignIn(selectedElement)}
                >
                    Sign in
                </Button>
            </form>
        </Paper>
    }

    handlerElementSelect = (element) => this.setState({ selectedElement: element });

    handlerSignIn = (selectedElement) => {
        localStorage.setItem("element", selectedElement && selectedElement);
        this.handlerRouteChange();
    };

    handlerRouteChange() {
        let path = `/`;
        this.props.history.push(path);
    }
}

export default withRouter(AuthForm);