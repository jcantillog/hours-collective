import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
/* Styles */
import "./style.css";

class Layout extends Component {
    render() {
        const {header, children} = this.props;
        return <div className="layout">
            <AppBar position="static" className="layout-header">
                <Toolbar className="layout-header-toolbar">
                    <Typography variant="h6" className="layout-header-title">
                        <SpeakerNotes style={{marginRight: 10}}/> {header}
                    </Typography>
                    <IconButton className="layout-header-exit" onClick={() => this.handlerSignOut()}>
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className="layout-content">{children && children}</div>
        </div>
    };

    handlerSignOut = () => {
        localStorage.removeItem("element");
        this.handlerRouteChange();
    };

    handlerRouteChange() {
        let path = `/login`;
        this.props.history.push(path);
    }
}

Layout.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.object,
};

export default withRouter(Layout);
