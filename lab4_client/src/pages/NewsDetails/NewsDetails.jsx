import React, {useContext, useEffect, useState} from 'react';
import Menu from "../../components/Menu Components/Menu/Menu";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import NewsService from "../../API/NewsService";
import classes from "./NewsDetails.module.css";
import {Context} from "../../context";
import Loader from "../../components/Loader/Loader";
import NewsForm from "../../components/News Components/NewsForm/NewsForm";
import ModalWindow from "../../components/Modal Window/ModalWindow";

const NewsDetails = () => {
    const params = useParams();
    const [form, setForm] = useState(false);

    const [newsLetter, setNewsLetter] = useState({
        title: '',
        summary: '',
        main_part: '',
    });
    const router = useNavigate();
    const {user} = useContext(Context);

    const [fetchNewsLetter, isLoading, error] = useFetching(async (id)=>{
        // console.log(id);
        const jsonData = await NewsService.getById(id);
        // console.log(jsonData);
        setNewsLetter(jsonData);
    });
    const [deleteNewsLetter, isDeleting, errorDelete] = useFetching(async ()=>{
        console.log(params.id);
        await NewsService.deleteById(params.id, user.token);
        router('/news');
    });
    // const [updateNewsLetter, isUpdating, errorUpdate] = useFetching(async ()=>{
    //     console.log(params.id);
    //     await NewsService.updateItem(params.id, user.token);
    //     router('/news/' + params.id);
    // });

    useEffect(() => {

        // console.log(params.id);
        fetchNewsLetter(params.id);
    }, []);
    return (
        <div className={classes.newsDetails}>
            {/*<label>ID: {newsLetter._id}</label>*/}
            {/*<label>Title: {newsLetter.title}</label>*/}
            {/*<label>Summary: {newsLetter.summary}</label>*/}
            {/*<label>Main part: {newsLetter.main_part}</label>*/}
            {/*<button onClick={deleteNewsLetter}>DELETE</button>*/}
            {/*<img src={NewsService.getImagePath(newsLetter.imagePath)}/>*/}
            {isLoading
            ?<Loader/>
            :<div className={classes.Container}>
                    <img className={classes.Image} src={NewsService.getImagePath(newsLetter.imagePath)} alt="Model Image" />
                    <div className={classes.Header}>
                        <h1 className={classes.Title}>{newsLetter.title}</h1>
                        <div className={classes.ButtonsContainer}>
                            <button className={classes.backButton} onClick={()=>router('..', { relative: "path" })}>Return</button>
                            {user.username
                                ?<button className={classes.deleteButton} onClick={deleteNewsLetter}>Delete</button>
                                :null
                            }
                            {user.username
                                ?<button className={classes.updateButton} onClick={()=> {
                                    console.log(newsLetter);
                                    setForm(true);
                                }}>Update</button>
                                :null
                            }
                        </div>
                    </div>
                    <p className={classes.Summary}>Created at: {(new Date(newsLetter.createdAt)).toDateString()}</p>
                    <p className={classes.Summary}>Created at: {(new Date(newsLetter.createdAt)).toUTCString()}</p>
                    <p className={classes.Summary}>{newsLetter.summary}</p>
                    <div className={classes.MainPart}>{newsLetter.main_part}</div>
                </div>
            }
            <ModalWindow visible={form} setVisible={setForm}>
                {
                    isLoading
                        ?
                    <Loader/>
                        :
                    <NewsForm setVisible={setForm} isLoading={isLoading} newsID={params.id} newsDefault={newsLetter}/>
                }
            </ModalWindow>
            <Menu/>
        </div>
    );
};

export default NewsDetails;