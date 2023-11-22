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

const NewsPage = () => {
    const { isAuth } = useContext(Context);
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState(news);

    const [form, setForm] = useState(false);
    const [fetchNews, isLoading, error] = useFetching(async ()=>{
        const jsonData = await NewsService.getAll();
        // console.log(jsonData);
        setNews(jsonData);
        setFilteredNews(jsonData);
    });

    useEffect(() => {
        fetchNews();
    }, []);


    return (
        <div className={classes.newsPage}>
            <MainLabel>News</MainLabel>
            <NewsBar news={news} setFilteredNews={setFilteredNews} onAddClick={()=>setForm(true)}/>
            <NewsList News={filteredNews} isLoading={isLoading}/>

            <Menu/>
            <ModalWindow visible={form} setVisible={setForm}>
                <NewsForm setVisible={setForm}/>
            </ModalWindow>
        </div>
    );
};

export default NewsPage;