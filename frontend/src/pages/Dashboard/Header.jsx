import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { toast } from "react-toastify";


const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async(values) => {

        try{
            const response = await axios.post(url,values);
            if(response.data.success){
                  toast.success("Transaction saved successfully!");
                 setIsModalOpen(false);

            }else{
                    toast.error(response.data.message || "Something went wrong");
            }
        }
        catch(error){
             toast.error(error.response.data.message || "Something went wrong");
        }
    }


    return (
        <div>
            <div className="d-flex bg-light justify-content-between align-items-center mx-5 my-5 px-5 py-5 shadow-sm rounded">
                <div>range filter</div>
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

                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item label="Title" name="title">
                        <Input type='text'/>
                    </Form.Item>

                    <Form.Item label="Amount" name="amount">
                        <Input type='text'/>
                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <Input type='date'/>
                    </Form.Item>

                    <Form.Item label="Category" name="category">
                        <Input type='text'placeholder='salary, food, entertainment...'/>
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