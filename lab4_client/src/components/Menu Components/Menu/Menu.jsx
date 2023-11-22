import React, { useContext, useEffect, useState } from 'react';
import classes from "./Menu.module.css"
import MenuButton from '../MenuButton/MenuButton';
import DropDownMenuButton from '../DropDownMenuButton/DropDownMenuButton';
// import axios from '../../../../../../node_modules/axios/index';
import { Link } from 'react-router-dom';
import {Context} from "../../../context";
import DatePlate from "../DatePlate/DatePlate";

const Menu = ({ changeState, ...props }) => {

    // const [state, setState] = useState(false);
    const { menuActive, setMenuActive } = useContext(Context);
    const { isAuth, setIsAuth, user, setUser } = useContext(Context);
    // const { token } = useContext(AuthContext);
    function isOpen(e) {
/*        if (state) {
            setState(false);
        }
        else {
            setState(true);
        }*/
        // setState(!state);
        setMenuActive(!menuActive);
        console.log(e.key);
    }

    const [groups, setGroups] = useState([
        { id: 1, name: 'Droup 1', link: '' },
        { id: 2, name: 'Droup 2', link: '' },
        { id: 3, name: 'Droup 3', link: '' },
        { id: 4, name: 'Droup 4', link: '' },
        { id: 5, name: 'Droup 5', link: '' },
        { id: 6, name: 'Droup 6', link: '' },

    ]);

    useEffect(() => {
        // getUser();
    }, []);
    // async function getUser() {
    //     try {
    //         const response = await axios.get('http://192.168.0.53:8000/api/v1/auth/users/me',
    //             {
    //                 headers: {
    //                     'Authorization': 'Token ' + token
    //                 }
    //             });
    //         console.log('User');
    //         console.log(response.data);
    //         setUserName(response.data['username']);
    //     } catch (err) {
    //         console.error("Error2");
    //         console.log(err);
    //     }
    // }

    const logout = async (e) => {
        e.preventDefault();
    //     try {
    //         const response = await axios.post('http://192.168.0.53:8000/auth/token/logout/', {},
    //         {
    //             headers: {
    //                 'Authorization': 'Token ' + token
    //             }
    //         });
    //         console.log(response.data);
        console.log('Success logout');
        setIsAuth(false);
        setUser({
            username: '',
            token: ''
        });
        // sessionStorage.removeItem('auth');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
    //     } catch (err) {
    //         console.error("Error");
    //         console.log(err);
    //
    //     }
    }
    return (
        <div className="">
            <div className={classes.SideBarButton} onClick={ isOpen } tabIndex={'0'}>
                <span className={classes.SideBarButtonLine} style={{ top: 12 }}></span>
                <span className={classes.SideBarButtonLine} style={{ top: 22 }}></span>
                <span className={classes.SideBarButtonLine} style={{ top: 32 }}></span>
            </div>
            <div className={menuActive ? classes.SideBarOpened : classes.SideBarClosed}>
                <div className={classes.LoginLabel}>
                    <label>{user.username ? user.username : 'Login'}</label>
                </div>
                <div className={classes.SideBarScroll}>{/*onClick={() => { console.log("Test"); changeState('Events'); }}*/}
                    <Link to="/"><MenuButton state={menuActive}>MainPage</MenuButton></Link>
                    <Link to="/news"><MenuButton state={menuActive}>News</MenuButton></Link>

                    <Link to="/hotel"><MenuButton state={menuActive}>Hotels</MenuButton></Link>
                    {isAuth
                        ? <Link to="/order"><MenuButton state={menuActive}>Orders</MenuButton></Link>
                        : null
                    }
                    {isAuth
                        ? <Link to="/client"><MenuButton state={menuActive}>Clients</MenuButton></Link>
                        : null
                    }
                    {isAuth
                        ? <Link to="/sandbox"><MenuButton state={menuActive}>Sandbox</MenuButton></Link>
                        : null
                    }
                    {/*<MenuButton state={menuActive}></MenuButton>*/}
                    {/*<DropDownMenuButton menuState={menuActive} buttons={groups}>Groups</DropDownMenuButton>*/}
                    {/*<DropDownMenuButton menuState={state}/>*/}
                    {/*<MenuButton state={menuActive}>Users</MenuButton>*/}
                    <DatePlate/>

                </div>
                {isAuth
                    ? <MenuButton onClick={logout} state={menuActive} style={{ bottom: 12, position: 'absolute', left: 12 }}>Logout</MenuButton>
                    : <Link to="/login/_"><MenuButton state={menuActive} style={{ bottom: 12, position: 'absolute', left: 12 }}>Log In</MenuButton></Link>
                }
{/*                <MenuButton state={state} style={{ bottom: 12, marginLeft: 12, marginRight: 12 }}>Logout</MenuButton>*/}
            </div>
        </div>
    );
};

export default Menu;