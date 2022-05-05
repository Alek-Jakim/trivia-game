import React, { useContext, useEffect } from "react"
import styles from "../styles/Navbar.module.css"
import Link from "next/link"
import GameContext from "../context/GameContext"
import { FaUserGraduate } from "react-icons/fa"

const Navbar = () => {

    const { userProfile, logout } = useContext(GameContext);


    useEffect(() => {
        if (!userProfile) {
            logout();
        }
    });

    return (
        <nav className={styles["nav"]}>

            <div className={styles["nav-left"]}>
                <h3 className={styles["nav-title"]}><span>Trivia</span>Project</h3>
            </div>

            <div className={styles["nav-right"]}>
                <div className={styles["nav-links"]}>
                    <Link href="/"><a className={styles["nav-link"]}>Home</a></Link>


                    {
                        !userProfile &&

                        <>
                            <Link href="/signup"><a className={styles["nav-link"]}>Sign Up</a></Link>

                            <Link href="/login"><a className={styles["nav-link"]}>Log In</a></Link>
                        </>
                    }

                    {userProfile &&
                        <>
                            <Link href="/game/setup"><a className={styles["nav-link"]}>New Game</a></Link>
                            <Link href="/"><a onClick={logout} className={styles["nav-link"]}>Log Out</a></Link>

                            <p className={styles["nav-user"]}><FaUserGraduate className={styles["nav-user-icon"]} />&nbsp; {userProfile.username}</p>
                        </>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar