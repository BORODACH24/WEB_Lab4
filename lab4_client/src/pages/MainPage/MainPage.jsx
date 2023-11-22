import React, {useContext, useEffect, useState} from 'react';
import classes from "./MainPage.module.css";
import Menu from "../../components/Menu Components/Menu/Menu";
import MainLabel from "../../components/MainLabel/MainLabel";
import ApiPlate from "../../components/ApiPlate/ApiPlate";
import {useFetching} from "../../hooks/useFetching";
import {Context} from "../../context";

const MainPage = () => {
    const { menuActive, setMenuActive } = useContext(Context);

    const [joke, setJoke] = useState({
       setup: '',
       punchline: ''
    });
    const [fetchJoke, jokeError] = useFetching(async ()=>{
        const response = await fetch('https://official-joke-api.appspot.com/random_joke'); // Replace with your API endpoint
        const jsonData = await response.json();
        console.log(jsonData);
        setJoke(jsonData);
    });
    const [fact, setFact] = useState({
       fact: ''
    });
    const [fetchFact, factError] = useFetching(async ()=>{
        const response = await fetch('https://catfact.ninja/fact'); // Replace with your API endpoint
        const jsonData = await response.json();
        // console.log(jsonData);
        setFact(jsonData);
    });
    useEffect(() => {
        fetchJoke();
        console.log('useEffect');
        fetchFact();
    }, []);
    const {user} = useContext(Context);

    return (
        <div className={classes.mainPage}>
            {user.username
                ?<MainLabel>Hello, {user.username}</MainLabel>
                :<MainLabel>WELCOME TO MY WEBSITE</MainLabel>
            }

            <div className={classes.apiPlates}>
                <ApiPlate line_1={joke.setup} line_2={joke.punchline} error={jokeError} header='Maybe a joke?'/>
                <ApiPlate line_1={fact.fact} error={factError} header='Maybe a fact about cats?'/>
            </div>
            <Menu/>
        </div>
    );
};

export default MainPage;