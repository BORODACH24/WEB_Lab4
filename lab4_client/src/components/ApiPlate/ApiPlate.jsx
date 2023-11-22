import React from 'react';
import classes from "./ApiPlate.module.css";

const ApiPlate = ({header, line_1, line_2, error}) => {
    return (
        <div className={classes.mainPlate} id="joke">
            <label className={classes.plateLabel}>{ header }</label>
                {
                    error
                    ?<label>{error}</label>
                    :<div className={classes.plateSetup}>
                        <label>{ line_1 }</label>
                        <label>{ line_2 }</label>
                    </div>
                }
        </div>
    );
};

export default ApiPlate;