import React from "react"
import styles from "../styles/Home.module.css"
import { useTable } from "react-table"
import TableStyles from "./styled/TableStyles"
import Table from "./Table"


const Rankings = ({ gameResults }) => {

    console.log(gameResults)

    const columns = React.useMemo(
        () => [
            {
                Header: "Game Ranking",
                columns: [
                    {
                        Header: "Rank",
                        accessor: "rank",
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
    )


    return (
        <div className={styles["h-table-cont"]}>
            <TableStyles>
                <Table columns={columns} data={gameResults}></Table>
            </TableStyles>
        </div>
    )
}

export default Rankings