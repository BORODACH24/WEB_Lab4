import React from 'react';
import classes from "./HotelPlate.module.css";
import NewsService from "../../../API/NewsService";
import StarWidget from "../StarWidget/StarWidget";

const HotelPlate = ({item, onClick, ...props}) => {
    return (
        <div className={classes.hotelPlate} onContextMenu={onClick}>
            {/*<img src={'http://localhost:5000'+item.imagePath}/>*/}
            <img src={NewsService.getImagePath(item.imagePath)}/>
            <div className={classes.Header}>
                <label className={classes.title}>{item.name}</label>
                <StarWidget stars={item.stars}/>
                {/*<label className={classes.summary}>{item.stars}</label>*/}
                <label className={classes.summary}>Cost per day: {item.cost_per_day}$</label>
                <label className={classes.summary}>Country: {item.country}</label>
            </div>
            <hr/>
            <p>{item.description}</p>
        </div>
    );
};

export default HotelPlate;