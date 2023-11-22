import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({label, ...props}) => {
    return (
        <div className={classes.MyInput}>
            <input {...props}/>
            <label>{label}</label>
        </div>
    );
};

export default MyInput;