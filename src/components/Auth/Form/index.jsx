import React, {Component} from "react";
import PropTypes from 'prop-types';

import {
    Avatar,
    Button,
    FormControl,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    withStyles
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Select from "react-select";

/* Style */
import "./style.css";
/* Services */
import GoogleSheetsService from "../../../services/GoogleSheetsService";

const styles = theme => ({
    paper: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class AuthForm extends Component {
    state = {
        elements: [],
        password: '',
        showPassword: false
    };
    GoogleSheets = new GoogleSheetsService();

    componentDidMount() {
        this.GoogleSheets.getElements().then(response => this.setState({elements: response}));
    }

    render() {
        const {elements, password, showPassword} = this.state;
        const {classes} = this.props;
        return <Paper className="paper">
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Hours Collective
            </Typography>
            <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
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
                        required
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <TextField
                        style={{zIndex: 0}}
                        name="password"
                        className={classes.margin}
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        value={password}
                        onChange={this.handleChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign in
                </Button>
            </form>
        </Paper>
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };
}

AuthForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthForm);