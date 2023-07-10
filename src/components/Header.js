import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Header.module.css";

function Header() {

return  (

<div className={styles["mainContain"]}>
    <div className={styles["leftHeader"]}>
        <div className={styles["navMenu"]}>
          
                <Link
                to="/"
                className={styles['spanStyle']} 
                >
                <span style={{ marginRight: -9 }}>Home</span>
                </Link>
       
        </div>
    </div>

    <div className={styles["centerHeader"]}>
        <div className={styles["centerHeader2"]}>
            <div className={styles["navMenu"]}>
            
                    <Link to="/" style={{ color: "darkgreen", textDecoration: "none" }}>
                        <span style={{ fontSize: "larger" }}>
                        Big Cheeseballer
                        </span>
                    </Link>
               
            </div>
        </div>
    </div>

    <div className={styles["rightHeader"]}>
        <div className={styles["navMenu"]}>
     
                <Link
                to="/"
                className={styles['spanStyle']} 
                >
                <span>Home</span>
                </Link>
       
        </div>
    </div>
</div>
);
}

export default Header;