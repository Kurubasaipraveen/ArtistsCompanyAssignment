import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = () => {
            axios.get('http://localhost:5000/transactions')
                .then(response => {
                    const transactionsWithBalance = calculateRunningBalance(response.data);
                    setTransactions(transactionsWithBalance);
                })
                .catch(error => {
                    console.error('There was an error fetching the transactions!', error);
                    setError('Failed to fetch transactions');
                });
        };

        fetchTransactions();
    }, []); // Empty dependency array, effect runs only once

    const calculateRunningBalance = (transactions) => {
        let balance = 0;
        return transactions.map(transaction => {
            if (transaction.credit) {
                balance += transaction.credit;
            } else if (transaction.debit) {
                balance -= transaction.debit;
            }
            return { ...transaction, balance };
        });
    };

    return (
        <div>
            <h2 className='head'>Transaction Assignment</h2>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Office Transactions</th>
                        <th colSpan="2"></th>
                        <th><a href="/add">+ Add Transaction</a></th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.credit || 0}</td>
                                <td>{transaction.debit || 0}</td>
                                <td>{transaction.balance}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;