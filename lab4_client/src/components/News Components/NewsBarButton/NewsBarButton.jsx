import React from 'react';
import classes from "./NewsBarButton.module.css";
const NewsBarButton = ({children, ...props}) => {
    return (
        <button className={classes.newsBarButton} {...props}>
            {children}
        </button>
    );
};

export default NewsBarButton;