import React, {useContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../router/routes";
import Login from "../pages/Login/Login";
import MainPage from "../pages/MainPage/MainPage";
import {Context} from "../context";
import MenuButton from "./Menu Components/MenuButton/MenuButton";

const AppRouter = () => {
    const { isAuth } = useContext(Context);
    // console.log(isAuth);

    return (
        <Routes>
            <Route
                element={<MainPage/>}
                path='*'
            />
            {isAuth
            ?privateRoutes.map(route =>
                <Route
                    element={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )
            :<Route
                element={<Login/>}
                path='/login/:token'
            />}
            {publicRoutes.map(route =>
                <Route
                    element={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Route
                element={<MainPage/>}
                path='*'
            />
        </Routes>
    );
};

export default AppRouter;