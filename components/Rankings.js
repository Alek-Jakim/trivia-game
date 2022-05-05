import React from "react"
import styles from "../styles/Home.module.css"
import { useTable } from "react-table"
import styled from "styled-components"




const TableStyles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    text-align: center;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
          
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;


      :last-child {
        border-right: 0;
      }
    }
  }
`



function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}






const Rankings = ({ gameResults }) => {

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