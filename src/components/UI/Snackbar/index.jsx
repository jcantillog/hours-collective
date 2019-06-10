import React from "react";
import PropTypes from 'prop-types';
import {
    SnackbarContent,
    Icon,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
/* Styles */
import "./style.css";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const SnackbarContentWrapper = ({className, variant, message, onClose, ...other}) => {
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
            className={`snackbar-${variant} ${className}`}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className="snackbar-message">
                    <Icon className="snackbar-icon snackbar-icon-variant"/>
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className="snackbar-icon"/>
                </IconButton>,
            ]}
            {...other}
        />
    );
};

SnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default SnackbarContentWrapper;
