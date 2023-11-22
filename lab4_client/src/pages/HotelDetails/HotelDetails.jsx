import React, {useContext, useEffect, useState} from 'react';
import Menu from "../../components/Menu Components/Menu/Menu";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import NewsService from "../../API/NewsService";
import classes from "./NewsDetails.module.css";
import {Context} from "../../context";
import Loader from "../../components/Loader/Loader";
import HotelService from "../../API/HotelService";

const HotelDetails = () => {
    const params = useParams();
    const [hotel, setHotel] = useState({});
    const router = useNavigate();
    const {user} = useContext(Context);

    const [fetchHotel, isLoading, error] = useFetching(async (id)=>{
        console.log(id);
        const jsonData = await HotelService.getById(id);
        console.log(jsonData);
        setHotel(jsonData);
    });
    const [deleteHotel, isL, errorDelete] = useFetching(async ()=>{
        console.log(params.id);
        await HotelService.deleteById(params.id);
        router('/hotel');
    });

    useEffect(() => {

        console.log(params.id);
        fetchHotel(params.id);
    }, []);
    return (
        <div className={classes.newsDetails}>
            {/*<label>ID: {newsLetter._id}</label>*/}
            {/*<label>Title: {newsLetter.title}</label>*/}
            {/*<label>Summary: {newsLetter.summary}</label>*/}
            {/*<label>Main part: {newsLetter.main_part}</label>*/}
            {/*<button onClick={deleteNewsLetter}>DELETE</button>*/}
            {/*<img src={NewsService.getImagePath(newsLetter.imagePath)}/>*/}
            {isLoading
                ?<Loader/>
                :<div className={classes.Container}>
                    <img className={classes.Image} src={HotelService.getImagePath(hotel.imagePath)} alt="Model Image" />
                    <div className={classes.Header}>
                        <h1 className={classes.Title}>{hotel.name}</h1>
                        <div className={classes.ButtonsContainer}>
                            <button className={classes.backButton} onClick={()=>router('..', { relative: "path" })}>Return</button>
                            {user.username
                                ?<button className={classes.deleteButton} onClick={deleteHotel}>Delete</button>
                                :null
                            }
                        </div>
                    </div>
                    <p className={classes.Summary}>{hotel.stars}</p>
                    <p className={classes.Summary}>{hotel.cost_per_day}</p>
                    <p className={classes.Summary}>{hotel.country}</p>
                </div>
            }

            <Menu/>
        </div>
    );
};

export default HotelDetails;