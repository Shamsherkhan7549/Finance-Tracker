import React, { useContext, useEffect } from 'react'
import { TransactionContext } from '../../context/ContextProvider'
import './Dashboard.css'

const Transaction = () => {
    const { transactionsInfo, setTransactionsInfo, fetchTransactions } = useContext(TransactionContext);

    useEffect(() => {
        console.log(transactionsInfo);
    }, [transactionsInfo])

    return (
        <div className='container'>
            <div className="row my-5 shadow p-5 mb-5 bg-body rounded table-responsive-md">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Edit/Delete</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            transactionsInfo.length > 0 &&
                            transactionsInfo.map((element) => (
                                <tr key={element._id}>
                                    <th scope="row">{element.title}</th>
                                    <td>{element.date.slice(0, 10)}</td>
                                    <td>{element.category}</td>
                                    <td className={`text-${element.type === "income" ? "success" : "danger"}`}>{element.type}</td>
                                    <td className={`text-${element.type === "income" ? "success" : "danger"}`}>
                                        {element.type === "income" ? "+" : "-"} &#x20B9;{element.amount}
                                    </td>
                                    <td className='d-flex text-center gap-3'>
                                        <span className="me-3 pointer">
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </span>
                                        <span className='pointer'>
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transaction