import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import {Context} from "./context";
import {useEffect, useState} from "react";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({
        username:'',
        token:''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        console.log("############");
        if(sessionStorage.getItem('username')){
            setIsAuth(true);
            setUser({
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token')
            });
            // setIsLoading(false);
        }
    }, []);

    function isOpen(e) {
        if (e.key === 'Escape') {
            setMenuActive(prevState => !prevState);
        }
        // console.log(e.key);
        // console.log(menuActive);
    }
    useEffect(() => {

        window.addEventListener('keydown', isOpen);

        return () => {
            window.removeEventListener('keydown', isOpen);
        };
    }, []);
    return (
      <Context.Provider value={{
          isAuth,
          setIsAuth,
          menuActive,
          setMenuActive,
          user,
          setUser
          // isLoading
      }}>
          <BrowserRouter>
              <AppRouter/>
          </BrowserRouter>
      </Context.Provider>
  );
}

export default App;
