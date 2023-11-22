import React from 'react';
import classes from "./ClientList.module.css";
import ClientPlate from "../ClientPlate/ClientPlate";
import {useNavigate} from 'react-router-dom'
import Loader from "../../Loader/Loader";

const ClientList = ({Clients, isLoading}) => {
    const router = useNavigate();
    return (
        isLoading
            ?<Loader/>
            :Clients.length === 0
                ?
            <label>No Clients</label>
                :
            <table className={classes.clients}>
                <thead>
                    <tr>
                        <th>Last name</th>
                        <th>First name</th>
                        <th>Patronymic</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>*/}
                    {/*    <td>Last name</td>*/}
                    {/*    <td>First name</td>*/}
                    {/*    <td>Patronymic</td>*/}
                    {/*    <td>Email</td>*/}
                    {/*    <td>Phone number</td>*/}
                    {/*    <td>Date</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>Last name</td>*/}
                    {/*    <td>First name</td>*/}
                    {/*    <td>Patronymic</td>*/}
                    {/*    <td>Email</td>*/}
                    {/*    <td>Phone number</td>*/}
                    {/*    <td>Date</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>Last name</td>*/}
                    {/*    <td>First name</td>*/}
                    {/*    <td>Patronymic</td>*/}
                    {/*    <td>Email</td>*/}
                    {/*    <td>Phone number</td>*/}
                    {/*    <td>Date</td>*/}
                    {/*</tr>*/}
                    {Clients.map((ht)=>
                        <ClientPlate key={ht._id} item={ht}/>
                    )}
                </tbody>
            </table>
    );
};

export default ClientList;