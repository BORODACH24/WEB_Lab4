import React, {useContext, useEffect, useState} from 'react';
import classes from "./NewsForm.module.css";
import {useFetching} from "../../../hooks/useFetching";
import NewsService from "../../../API/NewsService";
import {Context} from "../../../context";
import MyInput from "../../MyInput/MyInput";
import MyTextarea from "../../MyTextarea/MyTextarea";
import Loader from "../../Loader/Loader";
const NewsForm = ({ setVisible, isLoading, newsID= "_", newsDefault = {
                                                                            title: '',
                                                                            summary: '',
                                                                            main_part: '',
                                                                        } }) => {
    const {user} = useContext(Context);
    const [newsletter, setNewsletter] = useState(newsDefault);
    const [imageFile, setImageFile] = useState(null);
    const [addNewsletter, isAdding, error] = useFetching(async (e)=>{
        // e.preventDefault();
        console.log(newsID);
        console.log(newsletter);
        if(newsID === "_"){
            await NewsService.postItem(newsletter, imageFile, user.token);
        }
        else{
            await NewsService.updateItem(newsID, newsletter, imageFile, user.token);
        }
        // console.log(n);
        // console.log(error);
        setVisible(false);
    });
    function handleChange(e){
        setNewsletter({
            ...newsletter,
            [e.target.name]: e.target.value
        });
        // console.log(e.target.value);
    };
    const handleFileChange = (event) => {
        // Update the state with the selected image file
        setImageFile(event.target.files[0]);
        // console.log(imageFile);
    };

    // useEffect(() => {
    //     console.log("NewsID: ", newsID);
    //     console.log("NewsForm: ", newsletter);
    //     console.log("newsDefault: ", newsDefault);
    //     console.log("isLoading: ", isLoading);
    //     setNewsletter(newsDefault);
    // }, []);

    return (
        isAdding
            ?
        <Loader/>
            :
        <form className={classes.newsForm} onSubmit={addNewsletter}>
            {error ? <label>Error: {error}</label> : null}
            <MyInput label={'Title'} name="title" onChange={handleChange} value={newsletter.title} required/>
            <MyInput label={'Summary'} name="summary" onChange={handleChange} value={newsletter.summary} required/>
            {/*<input placeholder='Title' name="title" onChange={handleChange} required/>*/}
            {/*<input placeholder='Summary' name="summary" onChange={handleChange} required/>*/}
            <MyTextarea label={'Main part'} name="main_part" onChange={handleChange} value={newsletter.main_part} required/>
            {/*<textarea placeholder='Main part' name="main_part" onChange={handleChange} required></textarea>*/}
            <input type="file" name='image' onChange={handleFileChange} />
            {/*<img />*/}

            {error ? <label>Error: {error}</label> : null}

            <button>Add</button>
        </form>
    );
};

export default NewsForm;