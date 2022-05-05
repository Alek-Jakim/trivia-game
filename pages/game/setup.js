import React, { useState, useContext, useEffect } from "react"
import styles from "../../styles/GameOptions.module.css"
import { OPEN_DB_URL, API_URL } from "../../config";
import GameContext from "../../context/GameContext";
import Router from "next/router"
import { categoryMap, checkToken, checkValidToken } from "../../utils/utils"
import decode from "jwt-decode"
import { useRouter } from "next/router";

const SetupPage = ({ token }) => {

    const { setGameUrl, setMatchStarted, logout, userProfile } = useContext(GameContext);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const [gameOptions, setGameOptions] = useState({
        numOfQuestions: 10,
        difficulty: "any",
        category: "any",
        questionType: "any"
    });


    useEffect(() => {
        checkToken(token, decode, logout);
    });

    useEffect(() => {
        if (!userProfile) {
            router.push("/")
        }
    }, [])




    const handleSetupSubmit = async (e) => {
        e.preventDefault();

        // starts loader
        setLoading(true);

        /* qNum, cat & dif are the queries needed for the final api call before the game */
        let qNum = `?amount=${gameOptions.numOfQuestions}`;
        let cat = gameOptions.category === "any" ? "" : `&category=${categoryMap[`${gameOptions.category}`]}`
        let dif = gameOptions.difficulty === "any" ? "" : `&difficulty=${gameOptions.difficulty}`;
        let qType = gameOptions.questionType === "any" ? "" : `&type=${gameOptions.questionType}`;

        //this concatenates all the queries above to form the url sent to seturl
        const gameUrl = `${OPEN_DB_URL}${qNum}${cat}${dif}${qType}`.trim();

        if (gameUrl) {
            setGameUrl(gameUrl);

            const results = await fetch(`${API_URL}/seturl`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url_string: gameUrl })
            });

            if (results.ok) {
                setTimeout(() => {
                    setMatchStarted(true);
                    setLoading(false);
                    Router.push("/game/match");
                }, 3000)
            }
        }
    }

    return (
        <div className={styles["f"]}>

            {userProfile && <>
                {loading ? <div className="loader"></div> :
                    <>
                        <div className={styles["f-header-cont"]}>
                            <h3 className={styles["f-header"]}>Game Options</h3>
                        </div>


                        <form className={styles["f-form"]} onSubmit={(e) => handleSetupSubmit(e)}>

                            <div className={styles["f-input-cont"]}>
                                <label htmlFor="questions-number" className={styles["f-label"]} >Number of Questions</label>
                                <input onChange={(e) => setGameOptions({ ...gameOptions, numOfQuestions: e.target.value })} type="number" name="questions-number" defaultValue={10} className={styles["f-select"]} />
                            </div>

                            <div className={styles["f-input-cont"]}>
                                <label htmlFor="select-cat" className={styles["f-label"]} >Select Category</label>
                                <select name="select-cat" className={styles["f-select"]} onChange={(e) => setGameOptions({ ...gameOptions, category: e.target.value })}>
                                    <option value="any" defaultValue="Any Category">Any Category</option>
                                    <option value="generalKnowledge">General Knowledge</option>
                                    <option value="computerScience">Computer Science</option>
                                    <option value="sports">Sports</option>
                                    <option value="animals">Animals</option>
                                    <option value="mythology">Mythology</option>
                                    <option value="history">History</option>
                                </select>
                            </div>



                            <div className={styles["f-input-cont"]}>
                                <label htmlFor="select-dif" className={styles["f-label"]} >Select Difficulty</label>
                                <select name="select-dif" className={styles["f-select"]} onChange={(e) => setGameOptions({ ...gameOptions, difficulty: e.target.value })}>
                                    <option value="" defaultValue={""} disabled hidden>Select Difficulty</option>
                                    <option value="any">Any Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div className={styles["f-input-cont"]}>
                                <label htmlFor="select-dif" className={styles["f-label"]}>Select Question Type</label>
                                <select name="select-dif" className={styles["f-select"]} onChange={(e) => setGameOptions({ ...gameOptions, questionType: e.target.value })}>
                                    <option value="" defaultValue={""} disabled hidden>Select Question Type</option>
                                    <option value="any">Any Type</option>
                                    <option value="multiple">Multiple Choice</option>
                                    <option value="boolean">True / False</option>
                                </select>
                            </div>

                            <div className={styles["f-input-cont"]}>
                                <input type="submit" value="Start Game" className={styles["f-btn"]} />
                            </div>
                        </form>
                    </>
                }
            </>
            }
        </div>
    )
}

export default SetupPage;


export async function getServerSideProps({ req }) {

    let cookie = await req.headers.cookie || null;
    let token;

    if (cookie) {
        token = cookie.split("=")[1];
    } else {
        token = null;
    }

    return {
        props: {
            token,
        }
    }
}