import React from 'react';
import classes from "./MyTextarea.module.css";

const MyTextarea = ({label, ...props}) => {
    return (
        <div className={classes.MyTextarea}>
            <textarea {...props}/>
            <label>{label}</label>
        </div>
    );
};

export default MyTextarea;