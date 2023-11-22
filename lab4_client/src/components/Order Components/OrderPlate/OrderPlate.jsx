import React, {useContext} from 'react';
import classes from "./OrderPlate.module.css";
import NewsService from "../../../API/NewsService";
import {useFetching} from "../../../hooks/useFetching";
import HotelService from "../../../API/HotelService";
import OrderService from "../../../API/OrderService";
import {Context} from "../../../context";

const OrderPlate = ({item, onClick, ...props}) => {
    const {user} = useContext(Context);

    const [deleteOrder, isDeleting, errorDelete] = useFetching(async ()=>{
        await OrderService.deleteById(item._id, user.token);
        // await  fetchHotels();
    });
    return (
        <tr onClick={onClick}>
            <td>{item.hotel}</td>
            <td>{item.client}</td>
            <td>{item.departure_date}</td>
            <td>{(new Date(item.departure_date)).toLocaleDateString()}</td>
            <td>
                <button className={classes.deleteButton} onClick={deleteOrder}>Delete</button>
            </td>
        </tr>
    );
};

export default OrderPlate;