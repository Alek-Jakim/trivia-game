import React, { useState, useContext } from "react"
import styles from "../styles/Form.module.css"
import { FiUserCheck } from "react-icons/fi"
import Link from "next/link"
import GameContext from "../context/GameContext"


const LogIn = () => {

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const { login } = useContext(GameContext);


    const handleLogin = (e) => {
        e.preventDefault();

        if (!userLogin.email || !userLogin.password) {
            console.log("empty fields");
            return;
        }

        login(userLogin);
    }

    return (
        <div className={styles["f"]}>
            <div className={styles["f-container"]}>
                <h3 className={styles["f-header"]}><FiUserCheck className={styles["f-icon"]} /> Log in to your account</h3>
                <form className={styles["f-form"]} onSubmit={handleLogin}>
                    <input onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} className={styles["f-i-field"]} type="email" name="email" placeholder="Email..." />
                    <input onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} className={styles["f-i-field"]} type="password" name="password" placeholder="Password..." />
                    <input type="submit" value="Log in" className={styles["f-i-btn"]} />
                </form>
                <p className={styles["f-bottom"]}>Don't have an account? <Link href="/signup"><a>Sign up!</a></Link></p>
            </div>
        </div>
    )
}

export default LogIn