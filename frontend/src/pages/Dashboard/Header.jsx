import React, { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/ContextProvider';
import { Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { toast } from "react-toastify";


const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { fetchTransactions, transactionsInfo, setTransactionsInfo } = useContext(TransactionContext);
    const [transactionsDup, setTransactionsDup] = useState([])
    const [income, setIncome] = useState(true);
    const [expense, setExpense] = useState(true);

    const url = import.meta.env.VITE_BACKEND_URL;

    // Filter by type
    const handlingTypeIncome = (event) => {
        setIncome(!income)
        if (income) {
            setTransactionsDup(transactionsInfo);
            const filteredTransactions = transactionsInfo.filter(
                (ele) => ele.type === event.target.value
            );
            setTransactionsInfo(filteredTransactions);
        } else {
            setTransactionsInfo(transactionsDup);
        }
    }


    const handlingTypeExpense = (event) => {
        setExpense(!expense)
        if (expense) {
            setTransactionsDup(transactionsInfo);
            const filteredTransactions = transactionsInfo.filter(
                (ele) => ele.type === event.target.value
            );
            setTransactionsInfo(filteredTransactions);
        } else {
            setTransactionsInfo(transactionsDup);

        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (values) => {

        try {
            const response = await axios.post(`${url}/api/transactions`, values);
            if (response.data.success) {
                toast.success("Transaction saved successfully!");
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

    return (
        <div>
            <div className="d-flex flex-column flex-md-row gap-4 gap-md-0 justify-content-between align-items-start align-items-md-center mx-sm-5 m-3 p-3 my-2 px-sm-5 py-sm-5 shadow-sm rounded">
                <div className='d-flex flex-column flex-md-row gap-4'>
                    <div className='d-flex flex-column gap-1 align-items-center justify-content-center input-group-text'>
                        <p className='form-label'>Select Type</p>
                        <div className='d-flex gap-1 align-items-center bg-light '>
                            <label className='form-label fw-semibold' htmlFor='income'>Income</label>
                            <input id='income' value={'income'} className="form-check-input mb-2" type="checkbox" aria-label="Checkbox for following text input" onChange={handlingTypeIncome} />
                        </div>

                        <div className='d-flex gap-1 align-items-center '>
                            <label className='form-label fw-semibold' htmlFor='expense'>Expense</label>
                            <input id='expense' value={"expense"} className="form-check-input mb-2" type="checkbox" aria-label="Checkbox for following text input" onChange={handlingTypeExpense} />
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={showModal} className='btn btn-primary'>Add New</button>
                </div>


            </div>

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
                        <Input type='date' />
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
    )
}

export default Header