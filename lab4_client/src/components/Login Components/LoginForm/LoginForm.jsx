import React, {useContext, useEffect, useState} from 'react';
import classes from "./LoginForm.module.css"
import {Context} from "../../../context";
import {useFetching} from "../../../hooks/useFetching";
import NewsService from "../../../API/NewsService";
import UserService from "../../../API/UserService";
import {useNavigate, useParams} from "react-router-dom";
// const jwt = require('jsonwebtoken');
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
    const params = useParams();
    useEffect(() => {
        if(params.token !== "_"){
            // console.log(params.token);
            const decoded = jwtDecode(params.token);
            user.username = decoded.username;
            user.token = params.token;
            setIsAuth(true);

            // var decoded = jwt.verify(params.token, 'your-secret-key');
            // console.log(decoded);
            // sessionStorage.setItem('auth', 'true');
            sessionStorage.setItem('username', decoded.username);
            sessionStorage.setItem('token', params.token);

            router('/');
        }
        console.log(params.token);
    }, []);

    // const [userName, setUserName] = useState('');
    // const [password, setPassword] = useState('');
    const [userForm, setUserForm] = useState({
        username: '',
        password: ''
    });
    const { setIsAuth } = useContext(Context);
    const { user, setUser } = useContext(Context);
    const router = useNavigate();
    // const login = async (e) => {
    //     e.preventDefault();
        // try {
        //     const response = await axios.post('http://192.168.0.53:8000/auth/token/login/', {
        //             username: userName,
        //             password: password
        //         },
        //         /*{
        //             headers: {
        //                 'X-CSRFTOken': 'uhTD3vSjaOhnEC2Bda0bgRW5rzvFMTCRnQoX2aRDP2RDHMtP2YEqhaHDQvMbb9h0',
        //                 'Content-Type': 'application/json'
        //             }
        //         }*/
        //     );
        //     console.log(response.data);
        //     console.log('Success');
        //     setIsAuth(true);
            // console.log("aith");
            // sessionStorage.setItem('auth', 'true')
        //     setToken(response.data['auth_token']);
        // } catch (err){
        //     console.error("Error");
        //     console.log(userName);
        //     console.log(password);
        //     console.log(err);
        // }

    // }
    const [login,isLoading, error] = useFetching(async (e)=>{
        e.preventDefault();
        // console.log(userForm);
        const jsonData = await UserService.login(userForm);

        // console.log(jsonData.token);
        user.username = userForm.username;
        user.token = jsonData.token;
        setIsAuth(true);
        // sessionStorage.setItem('auth', 'true');
        sessionStorage.setItem('username', userForm.username);
        sessionStorage.setItem('token', jsonData.token);

        router('/');
        // console.log(jsonData.token);
        // console.log(user);
    });
    const [loginGoogle, isLo, errorGoogle] = useFetching(async (e)=>{
        e.preventDefault();
        // console.log(userForm);
        const jsonData = await UserService.loginGoogle();

        console.log(jsonData.token);
        //user.username = userForm.username;
        //user.token = jsonData.token;
        //setIsAuth(true);
        // sessionStorage.setItem('auth', 'true');
        //sessionStorage.setItem('username', userForm.username);
        //sessionStorage.setItem('token', jsonData.token);

        //router('/');
        // console.log(jsonData.token);
        // console.log(user);
    });
    function handleChange(e){
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        });
        // console.log(userForm);
    }
    // const googleAuth = () => {
    //     window.open(
    //         `http://localhost:5000/api/users/auth/google/callback`,
    //         "_self"
    //     );
    // };
    // const googleAuth2 = async() => {
    //     const response = await fetch(`http://localhost:5000/api/users/auth/google`);
    //     if (!response.ok) {
    //         throw new Error(`Failed to initiate Google authentication: ${response.status}`);
    //     }
    //
    //     // Parse the JSON response to get the redirect URL
    //     const responseData = await response.json();
    //     console.log(responseData);
    // };
    return (
        <form method="post" onSubmit={login} className={classes.loginForm}>
            {/*{% csrf_token %}*/}
            <div className={classes.inputbox}>
                {/*<ion-icon name="log-in-outline"></ion-icon>*/}
                <input className={classes.TextInput} name="username" onChange={handleChange} required/>

                <label>Login</label>
            </div>
            <div className={classes.inputbox}>
                <input className={classes.TextInput} name="password" type='password' onChange={handleChange} required/>

                {/*<ion-icon name="lock-closed-outline"></ion-icon>*/}
                <label>Password</label>
            </div>

            <button className={classes.loginButton} type="submit">Log in</button>
            {/*<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>*/}
            {/*<script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>*/}
        {/*<button type='button' onClick={loginGoogle}>Google</button>*/}
        {/*    <p>Don't have a account <a href="/signup">Google</a></p>*/}

            {/*<button type='button' onClick={googleAuth}>googleAuth</button>*/}
        </form>
    );
};

export default LoginForm;