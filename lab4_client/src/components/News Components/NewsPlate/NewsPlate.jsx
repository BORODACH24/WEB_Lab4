import React from 'react';
import classes from "./NewsPlate.module.css";
import NewsService from "../../../API/NewsService";

const NewsPlate = ({item, onClick, ...props}) => {
    return (
        <div onDoubleClick={onClick}>
            <article className={classes.newsPlate}>
                {/*<img src={'http://localhost:5000'+item.imagePath}/>*/}
                <img src={NewsService.getImagePath(item.imagePath)}/>
                <label className={classes.title}>{item.title}</label>
                <label className={classes.summary}>{item.summary}</label>
            </article>
        </div>
    );
};

export default NewsPlate;