import React, { useState, useContext, useEffect } from "react"
import { shuffle } from "../../../utils/shuffle";
import { API_URL } from "../../../config";
import useSound from "use-sound"
import { rightSound, wrongSound } from "../../../utils/sounds"
import styles from "../../../styles/Match.module.css"
import { decodeHtml } from "../../../utils/decodeHtml";
import { findDifficulty } from "../../../utils/findDif";
import GameContext from "../../../context/GameContext";
import { useRouter } from "next/router";

const GameMatch = ({ trivia, url }) => {

    const router = useRouter();

    //context
    const { matchStarted, setMatchStarted, userProfile } = useContext(GameContext);

    // current states
    const [questionCounter, setQuestionCounter] = useState(0);

    const [gameOver, setGameOver] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);


    // sounds
    const [right] = useSound(rightSound);
    const [wrong] = useSound(wrongSound);

    //the only way for the match to start is to go through the setup
    useEffect(() => {
        if (!matchStarted) {
            router.push("/");
        }
    }, []);

    // go through questions until the end
    const handleNextQuestions = () => {
        let answerList = Array.prototype.slice.call(document.getElementById("question_list").children);

        answerList.forEach((option) => {
            option.disabled = false;
            option.style.color = "#000"
        });

        if (questionCounter === trivia.length - 1) {
            setGameOver(true)
            return;
        } else {
            setQuestionCounter(questionCounter => questionCounter += 1)
        }
    };

    const handleGameOver = async () => {
        let gameResult = {
            correct_answers: correctAnswers,
            score,
            difficulty: findDifficulty(url),
            username: userProfile.username,
            user_id: userProfile.id
        }


        // send results to api
        const response = await fetch(`${API_URL}/game/results`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameResult)
        })

        if (response.ok) {
            let data = await response.json();

            setMatchStarted(false);
            setGameOver(false);

            setTimeout(() => {
                router.push("/");
            }, 3000)
        } else {
            alert("Something went wrong")
        }

    }


    // right/wrong answer logic
    const handleChooseOption = (e, correctAnswer, difficulty) => {

        let answerList = Array.prototype.slice.call(document.getElementById("question_list").children);

        let selected = e.target.innerHTML.trim();

        if (selected === correctAnswer) {
            setCorrectAnswers(correctAnswers => correctAnswers += 1);

            if (difficulty === "easy") setScore(score => score += 20);

            if (difficulty === "medium") setScore(score => score += 40);

            if (difficulty === "hard") setScore(score => score += 75);

            right();
            e.target.style.color = "green";
        } else {
            wrong();
            answerList.forEach((option) => {
                option.innerHTML === correctAnswer ? option.style.color = "green" : option.style.color = "red";
            });
        }
        // this is to disable the other options once one is selected
        answerList.forEach((option) => {
            option.disabled = true;
        });
    }

    return (
        <div>
            {trivia && !gameOver && matchStarted && <div className={styles["m"]}>

                <div className={styles["m-top"]}>
                    <h3 className={styles["m-question"]}>Q{questionCounter + 1}: {trivia[questionCounter].question}</h3>
                </div>

                <div className={styles["m-bottom"]}>
                    <div className={styles["m-answers"]}>
                        <div id="question_list" className={styles["m-q-list"]}>
                            {trivia[questionCounter] && trivia[questionCounter].choices.map((choice, idx) => (
                                <button className={styles["m-option"]} key={idx} onClick={(e) => handleChooseOption(e, trivia[questionCounter].correct, trivia[questionCounter].difficulty)}>{choice}</button>
                            ))}
                        </div>
                    </div>
                </div>


                <div className={styles["m-btn-cont"]}>
                    <button className={styles["m-btn"]} onClick={handleNextQuestions}>Next Question</button>
                </div>

                <div className={styles["m-hud"]}>
                    <p className={styles["m-points"]}>Correct: {correctAnswers}/{trivia.length}</p>
                    <p className={styles["m-q-remain"]}>Questions remaining: {trivia.length - questionCounter}</p>
                    <p className={styles["m-q-remain"]}>Score: {score}</p>
                </div>
            </div>}


            {
                gameOver &&

                <div>
                    <h3>Quiz Finished</h3>
                    <p>Correct Answers: {correctAnswers}/{trivia.length}</p>
                    <p>Score: {score}</p>
                    <button onClick={handleGameOver}>Submit Results</button>
                </div>
            }
        </div>
    )
}

export default GameMatch;


export async function getServerSideProps(context) {

    // we set a new url every time we mess with the options, the only way to get it here is like this since we can't call useContext hook :(
    const data = await fetch(`${API_URL}/geturl`);
    let trivia;
    let modifiedTrivia;

    let url = await data.json();

    let url_string = await url[0].url_string;

    if (url_string) {
        let gameData = await fetch(url_string);

        trivia = await gameData.json();


        // I shuffle and create a new array with all answers 
        modifiedTrivia = await trivia.results.map((item) => {
            return {
                category: item.category,
                correct: decodeHtml(item.correct_answer),
                difficulty: item.difficulty,
                question: decodeHtml(item.question),
                choices: shuffle([...item.incorrect_answers, item.correct_answer])
            }
        })
    }

    return {
        props: {
            trivia: modifiedTrivia,
            url: url_string
        }, // will be passed to the page component as props
    }
}