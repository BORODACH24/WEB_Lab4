import React, {useContext} from 'react';
import classes from "./HotelList.module.css";
import HotelPlate from "../HotelPlate/HotelPlate";
import {useNavigate} from 'react-router-dom'
import Loader from "../../Loader/Loader";
import contextMenu from "../ContextMenu/ContextMenu";
import {Context} from "../../../context";

const HotelList = ({Hotels, isLoading, setHotel, isDeleting, setPosition, setContextMenu, setHotelID}) => {
    const router = useNavigate();
    const { isAuth } = useContext(Context);

    function ContextMenu(e, hotel){
        if(isAuth){
            e.preventDefault();
            setPosition({ x: e.pageX, y: e.pageY });
            setContextMenu(true);
            setHotelID(hotel._id);
            setHotel(hotel);
        }
   }
    return (
        isLoading || isDeleting
            ?<Loader/>
            :Hotels.length === 0
                ?
            <label>No Hotels</label>
                :
            <div className={classes.hotels}>
                {Hotels.map((ht)=>
                    <HotelPlate key={ht._id} item={ht} onClick={(e)=>ContextMenu(e, ht)}/>
                )}
                {/*{Hotels.map((ht)=>*/}
                {/*    <HotelPlate key={ht._id} item={ht} onClick={()=>router(`/hotel/${ht._id}`)}>*/}
                {/*)}*/}
            </div>


    );
};

export default HotelList;