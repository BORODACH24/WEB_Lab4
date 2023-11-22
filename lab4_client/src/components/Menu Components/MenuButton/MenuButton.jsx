import React from 'react';
import classes from "./MenuButton.module.css"

function MenuButton({ children, state, style, ...props }) {
    return (
        // <button {...props} className={classes.MenuButton} style={{ display: state ? 'block' : 'none', ...style }}>
        <button {...props} className={classes.MenuButton} style={ style }>
          {children}
        </button>
  );
}

export default MenuButton;