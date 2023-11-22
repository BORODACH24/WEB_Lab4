import React from 'react';
import classes from "./OrderList.module.css";
import OrderPlate from "../OrderPlate/OrderPlate";
import {useNavigate} from 'react-router-dom'
import Loader from "../../Loader/Loader";
import ClientPlate from "../../Client Components/ClientPlate/ClientPlate";

const OrderList = ({Orders, isLoading}) => {
    const router = useNavigate();
    return (
        isLoading
            ?<Loader/>
            :Orders.length === 0
                ?
            <label>No Orders</label>
                :
            <table className={classes.orders}>
                <thead>
                <tr>
                    <th>Hotel ID</th>
                    <th>Client ID</th>
                    <th>Departure date</th>
                    <th>Departure date</th>
                </tr>
                </thead>
                <tbody>
                {Orders.map((ht)=>
                    <OrderPlate key={ht._id} item={ht}/>
                )}
                </tbody>
            </table>

    );
};

export default OrderList;