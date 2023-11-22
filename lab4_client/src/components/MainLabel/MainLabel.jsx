import React from 'react';
import classes from './MainLabel.module.css'

const MainLabel = (props) => {
    return (
        <label className={classes.mainLabel}>
            {props.children}
        </label>
    );
};

export default MainLabel;