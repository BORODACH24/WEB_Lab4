import React, {useContext} from 'react';
import classes from "./ClientPlate.module.css";
import ClientService from "../../../API/ClientService";
import {useFetching} from "../../../hooks/useFetching";
import HotelService from "../../../API/HotelService";
import {Context} from "../../../context";

const ClientPlate = ({item, onClick, ...props}) => {
    const {user} = useContext(Context);

    const [deleteClient, isDeleting, errorDelete] = useFetching(async ()=>{
        console.log("Client delete: ", item._id);
        await ClientService.deleteById(item._id, user.token);
        // await  fetchHotels();
        // setContextMenu(false);
    });
    return (
        <tr onClick={onClick}>
            <td>{item.last_name}</td>
            <td>{item.first_name}</td>
            <td>{item.patronymic}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{(new Date(item.date)).toLocaleDateString()}</td>
            <td>
                <button className={classes.deleteButton} onClick={deleteClient}>Delete</button>
            </td>
        </tr>
    );
};

export default ClientPlate;