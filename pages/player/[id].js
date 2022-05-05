import React, { useContext, useEffect, useMemo } from "react"
import GameContext from "../../context/GameContext"
import { useRouter } from "next/router";
import { API_URL } from "../../config";
import TableStyles from "../../components/styled/TableStyles";
import Table from "../../components/Table";
import { capitalize, sortByScore } from "../../utils/utils";
import styles from "../../styles/Player.module.css"

const PlayerDashboard = ({ userResults }) => {

    const router = useRouter();

    const { userProfile } = useContext(GameContext);

    useEffect(() => {
        if (!userProfile) {
            router.push("/")
        }
    });


    const columns = useMemo(
        () => [
            {
                Header: "Game Ranking",
                columns: [
                    {
                        Header: "#",
                        accessor: "num",
                    },
                    {
                        Header: "Username",
                        accessor: "username",
                    },
                    {
                        Header: "Score",
                        accessor: "score",
                    },
                    {
                        Header: "Difficulty",
                        accessor: "difficulty",
                    },
                    {
                        Header: "Correct",
                        accessor: "correct_answers",
                    },
                ],
            }
        ],
        []
    );


    return (
        <div className={styles["p"]}>

            <div className={styles["p-title-cont"]}>
                <h1 className={styles["p-title"]}>{userProfile && userProfile.username}'s Dashboard</h1>
            </div>
            <div className={styles["p-table-container"]}>
                <TableStyles>
                    <Table columns={columns} data={userResults}></Table>
                </TableStyles>
            </div>

        </div>
    )
}

export default PlayerDashboard;



export async function getServerSideProps({ params: { id } }) {

    const response = await fetch(`${API_URL}/user/${id}`);

    let data = await response.json();

    let newData = await data.singleUserResults;

    let sortedData = await newData.sort(sortByScore).map((gameRes, index) => {
        return {
            ...gameRes,
            num: index += 1,
            difficulty: capitalize(gameRes.difficulty)
        }
    });

    return {
        props: {
            userResults: sortedData
        }
    }
}