import React from 'react';
import classes from "./SandboxPage.module.css";
import Menu from "../../components/Menu Components/Menu/Menu";

class SandboxPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: 0,
        };
    }

    handleScroll = () => {
        this.setState({
            scrollPosition: window.scrollY,
        });
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div className={classes.sandbox}>
                <h1>Scroll Position: {this.state.scrollPosition}</h1>
                {/* Your component content goes here */}
                <Menu/>
            </div>
        );
    }
}
export default SandboxPage;