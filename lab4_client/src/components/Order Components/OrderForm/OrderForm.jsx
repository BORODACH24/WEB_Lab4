import React, {useContext, useState} from 'react';
import classes from "./OrderForm.module.css";
import {useFetching} from "../../../hooks/useFetching";
import NewsService from "../../../API/NewsService";
import {Context} from "../../../context";
import HotelService from "../../../API/HotelService";
import OrderService from "../../../API/OrderService";
import MyInput from "../../MyInput/MyInput";
import Loader from "../../Loader/Loader";
const OrderForm = ({ setVisible, hotelID }) => {
    const {user} = useContext(Context);
    const [client, setClient] = useState({
        // Initialize with your POST data
        last_name: '',
        first_name: '',
        patronymic: '',
        email: '',
        phone_number: '',
        date: '',
        // ...
    });
    const [order, setOrder] = useState({
        // Initialize with your POST data
        hotel: hotelID,
        departure_date: '',
        // ...
    });
    const [addOrder, isLoading, error] = useFetching(async (e)=>{
        // e.preventDefault();
        console.log("Client: ", client);
        console.log("Order: ", order);
        order.hotel = hotelID;
        await OrderService.postItem(client, order, user.token);
        // console.log(n);
        // console.log(error);
        setVisible(false);
    });
    function ClientChange(e){
        setClient({
            ...client,
            [e.target.name]: e.target.value
        });
    };
    function OrderChange(e){
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    };
    return (
        isLoading
            ?
            <Loader/>
            :
        <form className={classes.orderForm} onSubmit={addOrder}>
            <MyInput label={"Last name"} name="last_name" onChange={ClientChange} required/>
            <MyInput label={"First name"} name="first_name" onChange={ClientChange} required/>
            <MyInput label={"Patronymic"} name="patronymic" onChange={ClientChange} required/>
            <MyInput label={"Email"} name="email" onChange={ClientChange} required/>
            <MyInput label={"Phone number"} name="phone_number" onChange={ClientChange} required/>
            <MyInput label={"Date"} name="date" type={'date'} onChange={ClientChange} required/>
            <MyInput label={"Departure date"} name="departure_date" type={'date'} onChange={OrderChange} required/>

            {error ? <label>Error: {error}</label> : null}

            <button>Add</button>
        </form>
    );
};

export default OrderForm;