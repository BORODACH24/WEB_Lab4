import React, {useContext, useEffect, useState} from 'react';
import classes from './NewsPage.module.css'
import Menu from "../../components/Menu Components/Menu/Menu";
import NewsList from "../../components/News Components/NewsList/NewsList";
import MainLabel from "../../components/MainLabel/MainLabel";
import {Context} from "../../context";
import ModalWindow from "../../components/Modal Window/ModalWindow";
import NewsBar from "../../components/News Components/NewsBar/NewsBar";
import NewsForm from "../../components/News Components/NewsForm/NewsForm";
import {useFetching} from "../../hooks/useFetching";
import NewsService from "../../API/NewsService";
import HotelService from "../../API/HotelService";
import HotelList from "../../components/Hotel Components/HotelList/HotelList";
import HotelBar from "../../components/Hotel Components/HotelBar/HotelBar";
import HotelForm from "../../components/Hotel Components/HotelForm/HotelForm";
import StarWidget from "../../components/Hotel Components/StarWidget/StarWidget";
import OrderForm from "../../components/Order Components/OrderForm/OrderForm";
import ContextMenu from "../../components/Hotel Components/ContextMenu/ContextMenu";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import HotelUpdateForm from "../../components/Hotel Components/HotelUpdateForm/HotelUpdateForm";

const HotelPage = () => {
    const router = useNavigate();
    const {user} = useContext(Context);

    const { isAuth } = useContext(Context);
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState(hotels);

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenu, setContextMenu] = useState(false);
    const [hotelID, setHotelID] = useState('');
    const [hotel, setHotel] = useState(null);

    const [isUpdate, setIsUpdate] = useState(false);
    const [hotelForm, setHotelForm] = useState(false);
    const [hotelUpdateForm, setHotelUpdateForm] = useState(false);
    const [orderForm, setOrderForm] = useState(false);
    const [fetchHotels, isLoading, error] = useFetching(async ()=>{
        const jsonData = await HotelService.getAll();
        // console.log(jsonData);
        setHotels(jsonData);
        setFilteredHotels(jsonData);
    });
    const [deleteHotel, isDeleting, errorDelete] = useFetching(async ()=>{
        console.log("Hotel delete: ", hotelID);
        await HotelService.deleteById(hotelID, user.token);
        await  fetchHotels();
        setContextMenu(false);
    });
    useEffect(() => {
        fetchHotels();
    }, []);


    return (
        <div className={classes.newsPage} onClick={()=>setContextMenu(false)}>
            <MainLabel>Hotels</MainLabel>
            <HotelBar hotels={hotels} setFilteredHotels={setFilteredHotels} onAddClick={()=>setHotelForm(true)}/>
            <HotelList Hotels={filteredHotels}
                       isLoading={isLoading}
                       setPosition={setContextMenuPosition}
                       setContextMenu={setContextMenu}
                       setHotelID={setHotelID}
                       setHotel={setHotel}/>

            <Menu/>
            <ModalWindow visible={hotelForm} setVisible={setHotelForm}>
                <HotelForm hotelID={hotelID} update={isUpdate} setVisible={setHotelForm} fetchHotels={fetchHotels}/>
            </ModalWindow>

            <ModalWindow visible={hotelUpdateForm} setVisible={setHotelUpdateForm}>
                {hotel===null
                    ?
                    <Loader/>
                    :
                <HotelUpdateForm hotelID={hotelID} hotel={hotel} setVisible={setHotelUpdateForm} fetchHotels={fetchHotels}/>
                }
            </ModalWindow>

            <ModalWindow visible={orderForm} setVisible={setOrderForm}>
                <OrderForm setVisible={setOrderForm} hotelID={hotelID}/>
            </ModalWindow>
            {isAuth
                ?
            <ContextMenu visible={contextMenu}
                         setVisible={setContextMenu}
                         styles={{
                             left: contextMenuPosition.x,
                             top: contextMenuPosition.y
                         }}>
                {hotelID}
                <button name={'delete'} onClick={deleteHotel}>Delete</button>
                <button name={'edit'} onClick={()=>{
                    setIsUpdate(true);
                    setHotelUpdateForm(true);
                    setContextMenu(false);
                }}>Edit</button>
                <button name={'order'} onClick={()=> {
                    setOrderForm(true);
                    setContextMenu(false);
                }}>Order</button>
            </ContextMenu>
                : null
            }
            {/*<ModalWindow visible={form} setVisible={setForm}>*/}
            {/*    {*/}
            {/*        isLoading*/}
            {/*            ?*/}
            {/*            <Loader/>*/}
            {/*            :*/}
            {/*            <NewsForm setVisible={setForm} isLoading={isLoading} newsID={params.id} newsDefault={newsLetter}/>*/}
            {/*    }*/}
            {/*</ModalWindow>*/}
            {/*<StarWidget stars={4}/>*/}
        </div>
    );
};

export default HotelPage;