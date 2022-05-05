import React, { useState, useContext } from "react"
import styles from "../styles/Form.module.css"
import { FiUserPlus } from "react-icons/fi"
import Link from "next/link"
import GameContext from "../context/GameContext"

const SignUp = () => {

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { signup, userProfile } = useContext(GameContext);

    const handleInput = (event, field) => {
        setNewUser({ ...newUser, [`${field}`]: event.target.value });
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!newUser) {
            return
        }

        const { username, password, confirmPassword } = newUser;

        if (username < 3 || username > 15) {
            alert("username must be between 3 and 15 characters long");
        }

        if (password !== confirmPassword) {
            alert("passwords must match");
            return;
        }

        await signup(newUser);

    }


    return (
        <div className={styles["f"]}>
            <div className={styles["f-container"]}>
                <h3 className={styles["f-header"]}><FiUserPlus className={styles["f-icon"]} />  Sign up for a new account</h3>
                <form className={styles["f-form"]} onSubmit={(e) => handleSubmitForm(e)}>
                    <input onChange={(e) => handleInput(e, "username")} className={styles["f-i-field"]} type="text" name="username" placeholder="Username" />
                    <input onChange={(e) => handleInput(e, "email")} className={styles["f-i-field"]} type="email" name="email" placeholder="Email" />
                    <input onChange={(e) => handleInput(e, "password")} className={styles["f-i-field"]} type="password" name="password" placeholder="Password" />
                    <input onChange={(e) => handleInput(e, "confirmPassword")} className={styles["f-i-field"]} type="password" name="confirm-password" placeholder="Confirm Password" />
                    <button type="submit" className={styles["f-i-btn"]}>Sign Up</button>
                </form>
                <p className={styles["f-bottom"]}>Already have an account?<Link href="/login"><a> Log in!</a></Link></p>
            </div>
        </div>
    )
}

export default SignUp