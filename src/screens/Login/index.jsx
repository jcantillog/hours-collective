import React from "react";
/* Components */
import AuthForm from "../../components/Auth/Form";
/* Styles */
import "./style.css";

export default () => {
    return (
        <div className="screen" header="">
            <div className="form">
                <AuthForm/>
            </div>
        </div>
    );
};