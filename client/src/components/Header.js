import React from 'react';
import logo from '../images/marvel-intro.gif'; 

const styles = {
  
    image: {
        width: "100%",
        height: "200px"
    },
} 

function Header() {
  
  return <img src={logo} alt="intro" style={styles.image}/>;
}

export default Header;

