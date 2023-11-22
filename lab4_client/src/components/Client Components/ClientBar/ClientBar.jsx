import React, {useContext, useEffect, useState} from 'react';
import classes from "./ClientBar.module.css";
import {Context} from "../../../context";
import SearchBar from "../../News Components/SearchBar/SearchBar";
import SortSelect from "../../News Components/SortSelect/SortSelect";
import NewsBarButton from "../../News Components/NewsBarButton/NewsBarButton";

const ClientBar = ({onAddClick, clients, setFilteredClients}) => {
    const [searchString, setSearchString] = useState('');
    const [sortDirection, setSortDirection] = useState('down');
    const [sortType, setSortType] = useState('title');
    const {user} = useContext(Context);

    useEffect(() => {
        setFilteredClients(clients.filter(
            obj => obj.last_name.toLowerCase().includes(searchString.toLowerCase()) ||
                obj.first_name.toLowerCase().includes(searchString.toLowerCase())||
                obj.patronymic.toLowerCase().includes(searchString.toLowerCase())||
                obj.email.toLowerCase().includes(searchString.toLowerCase())||
                obj.phone_number.toLowerCase().includes(searchString.toLowerCase())
        ));
    }, [searchString]);
    useEffect(() => {
        if(sortDirection === 'up'){
            setFilteredClients([...clients].sort((a, b) => a[sortType].localeCompare(b[sortType])).reverse());
        }
        else{
            setFilteredClients([...clients].sort((a, b) => a[sortType].localeCompare(b[sortType])));
        }
    }, [sortDirection, sortType]);

    return (
        <div className={classes.newsBar}>

            <SortSelect value={sortType} onChange={sort => setSortType(sort)} options={[
                {value: 'last_name', body: 'Last name'},
                {value: 'first_name', body: 'First name'},
                {value: 'patronymic', body: 'Patronymic'},
                {value: 'email', body: 'Email'},
            ]}></SortSelect>
            <NewsBarButton onClick={()=>setSortDirection('down')}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </NewsBarButton>
            <NewsBarButton onClick={()=>setSortDirection('up')}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </NewsBarButton>
            <SearchBar str={searchString} setStr={setSearchString}/>
        </div>
    );
};

export default ClientBar;