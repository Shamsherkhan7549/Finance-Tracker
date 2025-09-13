import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/ContextProvider'
import { Button, Modal, Form, Input, Select } from 'antd';
import './Dashboard.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const Transaction = () => {
    const { transactionsInfo, fetchTransactions } = useContext(TransactionContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState("")
    const url = import.meta.env.VITE_BACKEND_URL;

    const showModal = async (id) => {
        try {
            setIsModalOpen(true);
            setEditId(id)
            const response = await axios.get(`${url}/${id}`);
            if (response.data.success) {
                form.setFieldsValue(response.data.transaction);
            }

        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (values) => {
       
        try {
            const response = await axios.put(`${url}/${editId}`, values);
            if (response.data.success) {
                toast.success("Transaction updated successfully!");
                fetchTransactions();
                setIsModalOpen(false);
                form.resetFields();

            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        }
        catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }


    // Delete transaction
    const handlingDelete = async (id) => {
        try {
            const response = await axios.delete(`${url}/${id}`);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message || "Transaction deleted successfully!");
                fetchTransactions();
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Error deleting transaction");
        }
    }

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
                                        <span onClick={() => showModal(element._id)} className="me-3 pointer">
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </span>
                                        <span className='pointer' onClick={() => handlingDelete(element._id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <Modal
                    title="Add New Transaction"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={false}
                >

                    <Form form={form} layout='vertical' onFinish={handleSubmit}>
                        <Form.Item label="Title" name="title">
                            <Input type='text' />
                        </Form.Item>

                        <Form.Item label="Amount" name="amount">
                            <Input type='text' />
                        </Form.Item>

                        <Form.Item label="Date" name="date">
                            <Input type='date'/>
                        </Form.Item>

                        <Form.Item label="Category" name="category">
                            <Input type='text' placeholder='salary, food, entertainment...' />
                        </Form.Item>

                        <Form.Item label="Type" name="type">
                            <Select >
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form>

                </Modal>

            </div>
        </div>
    )
}

export default Transaction