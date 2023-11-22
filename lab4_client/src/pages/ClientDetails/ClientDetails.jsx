import React, {useContext, useEffect, useState} from 'react';
import Menu from "../../components/Menu Components/Menu/Menu";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import classes from "./NewsDetails.module.css";
import {Context} from "../../context";
import Loader from "../../components/Loader/Loader";
import ClientService from "../../API/ClientService";

const ClientDetails = () => {
    const params = useParams();
    const [client, setClient] = useState({});
    const router = useNavigate();
    const {user} = useContext(Context);

    const [fetchClient, isLoading, error] = useFetching(async (id)=>{
        console.log(id);
        const jsonData = await ClientService.getById(id);
        console.log(jsonData);
        setClient(jsonData);
    });
    const [deleteClient, isL, errorDelete] = useFetching(async ()=>{
        console.log(params.id);
        await ClientService.deleteById(params.id);
        router('/client');
    });

    useEffect(() => {

        console.log(params.id);
        fetchClient(params.id);
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
                    <div className={classes.Header}>
                        <h1 className={classes.Title}>{client.title}</h1>
                        <div className={classes.ButtonsContainer}>
                            <button className={classes.backButton} onClick={()=>router('..', { relative: "path" })}>Return</button>
                            {user.username
                                ?<button className={classes.deleteButton} onClick={deleteClient}>Delete</button>
                                :null
                            }
                        </div>
                    </div>
                    <p className={classes.Summary}>{client.last_name}</p>
                </div>
            }

            <Menu/>
        </div>
    );
};

export default ClientDetails;