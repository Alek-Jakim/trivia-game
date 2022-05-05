import React from "react"
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { API_URL } from "../config"
import Rankings from "../components/Rankings"
import { sortByScore, capitalize } from "../utils/utils"
import { MdQuiz } from "react-icons/md"


export default function Home({ gameResults }) {

  return (
    <div className={styles["h"]}>
      <div className={styles["h-left"]}>
        <div className={styles["h-header"]}>
          <h3 className={styles["h-heading"]}><MdQuiz /> &nbsp;The Trivia Project</h3>
          <p className={styles["h-header-text"]}>Sign up and test your knowledge or stupidity in this trivia quiz game!</p>
        </div>
        <div className={styles["h-links"]}>
          <Link href="/signup"><a className={styles["h-link"]}>Sign Up</a></Link>
          <Link href="/login"><a className={styles["h-link"]}>Log in</a></Link>
        </div>
      </div>


      <div className={styles["h-right"]}>
        <Rankings gameResults={gameResults} />
      </div>
    </div>
  )
}



export async function getServerSideProps() {

  const response = await fetch(`${API_URL}/game/all`);

  const data = await response.json();

  let sortedData = await data.sort(sortByScore).map((gameRes, index) => {
    return {
      ...gameRes,
      rank: index += 1,
      difficulty: capitalize(gameRes.difficulty)
    }
  });


  return {
    props: {
      gameResults: sortedData
    }
  }
}