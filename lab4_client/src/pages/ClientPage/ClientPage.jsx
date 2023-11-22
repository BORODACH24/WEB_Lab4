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
import ClientList from "../../components/Client Components/ClientList/ClientList";
import ClientBar from "../../components/Client Components/ClientBar/ClientBar";
import ClientService from "../../API/ClientService";

const ClientPage = () => {
    const { isAuth } = useContext(Context);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState(clients);

    const [form, setForm] = useState(false);
    const [fetchClients, isLoading, error] = useFetching(async ()=>{
        const jsonData = await ClientService.getAll();
        // console.log(jsonData);
        setClients(jsonData);
        setFilteredClients(jsonData);
    });

    useEffect(() => {
        fetchClients();
    }, []);


    return (
        <div className={classes.newsPage}>
            <MainLabel>Clients</MainLabel>
            <ClientBar clients={clients} setFilteredClients={setFilteredClients} onAddClick={()=>setForm(true)}/>
            <ClientList Clients={filteredClients} isLoading={isLoading}/>

            <Menu/>
        </div>
    );
};

export default ClientPage;