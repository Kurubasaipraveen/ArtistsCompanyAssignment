import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './AddTransaction.css'
const AddTransaction = () => {
    const [newTransaction, setNewTransaction] = useState({
        date: '',
        description: '',
        transactionType: '',
        amount: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const credit = newTransaction.transactionType === 'Credit' ? Number(newTransaction.amount) : 0;
        const debit = newTransaction.transactionType === 'Debit' ? Number(newTransaction.amount) : 0;

        axios.post('http://localhost:10000/transactions', {
            date: newTransaction.date,
            description: newTransaction.description,
            credit,
            debit
        })
        .then(response => {
            console.log('Transaction added:', response.data); // Log response data
            setNewTransaction({
                date: '',
                description: '',
                transactionType: '',
                amount: ''
            });
            navigate('/');
        })
        .catch(error => {
            console.error('There was an error adding the transaction!', error);
        });
    };

    return (
        <div className="add-transaction-container">
            <h2>Add New Transaction</h2>
            <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={newTransaction.date} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={newTransaction.description} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Transaction Type:</label>
                    <select name="transactionType" type='scroll' value={newTransaction.transactionType} onChange={handleInputChange} required>
                        <option value="">Select Transaction Type</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" value={newTransaction.amount} onChange={handleInputChange} required />
                </div>
                <div className='btnn'>
                <button type="submit" className='button1'>Save</button>
                <Link to='/'>
                <button type="submit" className='button2'>Cancle</button>
                </Link>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;