import React from 'react';
import classes from "./NewsList.module.css";
import NewsPlate from "../NewsPlate/NewsPlate";
import {useNavigate} from 'react-router-dom'
import Loader from "../../Loader/Loader";

const NewsList = ({News, isLoading}) => {
    const router = useNavigate();
    return (
        isLoading
            ?<Loader/>
            :News.length === 0
                ?<label>No News</label>
                :<div className={classes.news}>
                {News.map((nw)=>
                    <NewsPlate key={nw._id} item={nw} onClick={()=>router(`/news/${nw._id}`)}/>
                )}
            </div>


    );
};

export default NewsList;