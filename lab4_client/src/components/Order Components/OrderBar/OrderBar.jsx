import React, {useContext, useEffect, useState} from 'react';
import classes from "./OrderBar.module.css";
import {Context} from "../../../context";
import NewsBarButton from "../../News Components/NewsBarButton/NewsBarButton";
import SortSelect from "../../News Components/SortSelect/SortSelect";
import SearchBar from "../../News Components/SearchBar/SearchBar";

const OrderBar = ({onAddClick, orders, setFilteredOrders}) => {
    const [searchString, setSearchString] = useState('');
    const [sortDirection, setSortDirection] = useState('down');
    const [sortType, setSortType] = useState('hotel');
    const {user} = useContext(Context);

    // useEffect(() => {
    //     setFilteredOrders(orders.filter(
    //         obj => obj.title.toLowerCase().includes(searchString.toLowerCase()) ||
    //             obj.summary.toLowerCase().includes(searchString.toLowerCase())
    //     ));
    // }, [searchString]);
    useEffect(() => {
        if(sortDirection === 'up'){
            setFilteredOrders([...orders].sort((a, b) => a[sortType].localeCompare(b[sortType])).reverse());
        }
        else{
            setFilteredOrders([...orders].sort((a, b) => a[sortType].localeCompare(b[sortType])));
        }
    }, [sortDirection, sortType]);

    return (
        <div className={classes.newsBar}>

            {/*{user.username*/}
            {/*    ?<NewsBarButton onClick={onAddClick}>*/}
            {/*        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>*/}
            {/*    </NewsBarButton>*/}
            {/*    : null*/}
            {/*}*/}
            <SortSelect value={sortType} onChange={sort => setSortType(sort)} options={[
                {value: 'client', body: 'Client ID'},
                {value: 'hotel', body: 'Hotel ID'},
            ]}></SortSelect>
            <NewsBarButton onClick={()=>setSortDirection('down')}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </NewsBarButton>
            <NewsBarButton onClick={()=>setSortDirection('up')}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </NewsBarButton>
            {/*<SearchBar str={searchString} setStr={setSearchString}/>*/}
        </div>
    );
};

export default OrderBar;