import React from 'react';
import classes from "./ContextMenu.module.css";
const ContextMenu = ({children, visible, setVisible, styles}) => {
    const modalClasses = [classes.contextMenu];
    if(visible){
        modalClasses.push(classes.active);
    }
    return (
        <div className={modalClasses.join(' ')} style={styles} onClick={(e)=>e.stopPropagation()}>
            {children}
        </div>
    );
};

export default ContextMenu;