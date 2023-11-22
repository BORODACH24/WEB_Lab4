import React from 'react';
import classes from "./ModalWindow.module.css";
const ModalWindow = ({children, visible, setVisible}) => {
    const modalClasses = [classes.modalWin];
    if(visible){
        modalClasses.push(classes.active);
    }
    return (
        <div className={modalClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={classes.innerModal} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;