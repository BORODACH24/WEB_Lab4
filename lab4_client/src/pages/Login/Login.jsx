import React from 'react';
import classes from "./Login.module.css"
import LoginForm from "../../components/Login Components/LoginForm/LoginForm";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const router = useNavigate();

    return (
        <section>
            <div className={classes.formBox}>
                <button className={classes.backButton} title={'Return'} onClick={()=>router('..', { relative: "path" })}>
                    <svg width="32px" height="32px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff80" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#ffffff80" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                    {/*<svg width="32px" height="32px" viewBox="0 0 1024 1024" fill="#d1d1d1" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path></g></svg>*/}
                </button>
                <h2>Login</h2>
                <LoginForm/>
                <div className={classes.register}>
                    {/*<p>Don't have a account <a href="/signup">Register</a></p>*/}
                    <p>Login with <a href="http://localhost:5000/api/users/auth/google">Google</a> or <a href="http://localhost:5000/api/users/auth/facebook">Facebook</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;