import React from 'react';
import classes from "./SortSelect.module.css";

const SortSelect = ({options, value, onChange}) => {
    return (
        <div className={classes.selectCover}>
            <select value={value} onChange={event => onChange(event.target.value)}>
                <option disabled value=''>Sort by</option>
                {options.map((e)=>
                    <option key={e.value} value={e.value}>{e.body}</option>
                )}
            </select>
        </div>
    );
};

export default SortSelect;