import React, {useContext, useState} from 'react';
import classes from "./HotelForm.module.css";
import {useFetching} from "../../../hooks/useFetching";
import NewsService from "../../../API/NewsService";
import {Context} from "../../../context";
import HotelService from "../../../API/HotelService";
import MyInput from "../../MyInput/MyInput";
import Loader from "../../Loader/Loader";
import MyTextarea from "../../MyTextarea/MyTextarea";
const HotelUpdateForm = ({ setVisible, fetchHotels, isUpdate, hotelID = "", hotelDefault }) => {
    const {user} = useContext(Context);
    const [hotel, setHotel] = useState({
        // Initialize with your POST data
        name: '',
        stars: 3,
        cost_per_day: 0,
        country: '',
        description: '',
        // ...
    });
    const [imageFile, setImageFile] = useState(null);
    const [addNewsletter, isLoading, error] = useFetching(async (e)=>{
        // e.preventDefault();
        console.log("update", hotelDefault);
        console.log("hotel id", hotelID);
        await HotelService.updateItem(hotelID, hotel, user.token);
        // console.log(n);
        // console.log(error);
        fetchHotels();
        setVisible(false);
    });
    function handleChange(e){
        setHotel({
            ...hotel,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value);
    };
    const handleFileChange = (event) => {
        // Update the state with the selected image file
        setImageFile(event.target.files[0]);
    };
    return (
        isLoading
            ?
            <Loader/>
            :
        <form className={classes.hotelForm} onSubmit={addNewsletter}>
            {/*<input placeholder='Name' name="name" onChange={handleChange} required/>*/}
            {/*<input placeholder='Stars' defaultValue={3} min={0} max={5} name="stars" type={"number"} onChange={handleChange} required/>*/}
            {/*<input placeholder='Cost per day' defaultValue={0} min={0} name="cost_per_day" type={"number"} onChange={handleChange} required/>*/}
            {/*<input placeholder='Country' name="country" onChange={handleChange} required/>*/}
            {/*<input type="file" name='image' onChange={handleFileChange} />*/}

            <MyInput label={"Name"} name="name" onChange={handleChange} required/>
            <MyInput label={"Stars"} defaultValue={3} min={0} max={5} name="stars" type={"number"} onChange={handleChange} required/>
            <MyInput label={"Cost per day"} defaultValue={0} min={0} name="cost_per_day" type={"number"} onChange={handleChange} required/>
            <MyInput label={"Country"} name="country" onChange={handleChange} required/>
            <MyTextarea label={'Description'} name="description" onChange={handleChange} required/>
            {/*<input type="file" name='image' onChange={handleFileChange} />*/}

            {error ? <label>Error: {error}</label> : null}

            <button>Add</button>
        </form>
    );
};

export default HotelUpdateForm;