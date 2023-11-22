import React, {useContext, useEffect, useState} from 'react';
import classes from './NewsPage.module.css'
import Menu from "../../components/Menu Components/Menu/Menu";
import MainLabel from "../../components/MainLabel/MainLabel";
import ModalWindow from "../../components/Modal Window/ModalWindow";
import {useFetching} from "../../hooks/useFetching";
import NewsService from "../../API/NewsService";
import OrderForm from "../../components/Order Components/OrderForm/OrderForm";
import OrderList from "../../components/Order Components/OrderList/OrderList";
import OrderBar from "../../components/Order Components/OrderBar/OrderBar";
import OrderService from "../../API/OrderService";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState(orders);

    const [form, setForm] = useState(false);
    const [fetchOrders, isLoading, error] = useFetching(async ()=>{
        const jsonData = await OrderService.getAll();
        // console.log(jsonData);
        setOrders(jsonData);
        setFilteredOrders(jsonData);
    });

    useEffect(() => {
        fetchOrders();
    }, []);


    return (
        <div className={classes.orderPage}>
            <MainLabel>Orders</MainLabel>
            <OrderBar orders={orders} setFilteredOrders={setFilteredOrders} onAddClick={()=>setForm(true)}/>
            <OrderList Orders={filteredOrders} isLoading={isLoading}/>

            <Menu/>
            {/*<ModalWindow visible={form} setVisible={setForm}>*/}
            {/*    <OrderForm setVisible={setForm}/>*/}
            {/*</ModalWindow>*/}
        </div>
    );
};

export default OrderPage;