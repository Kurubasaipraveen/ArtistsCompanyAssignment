const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let transactions = [
    { date: '02/17/2020', description: 'Credited to Office Account', credit: 5000, debit: 0, balance: 5000 },
    { date: '02/18/2020', description: 'Snacks Party', credit: 0, debit: 500, balance: 4500 },
    { date: '02/18/2020', description: 'Printing sheets for office documents', credit: 0, debit: 285, balance: 4215 },
    { date: '02/20/2020', description: 'Misc Expenses', credit: 0, debit: 3000, balance: 3915 }
];

app.get('/transactions', (req, res) => {
    res.json(transactions);
});

app.post('/transactions', (req, res) => {
    const { date, description, credit, debit } = req.body;
    const balance = transactions.length ? transactions[transactions.length - 1].balance : 0;
    const newBalance = balance + credit - debit;
    const newTransaction = { date, description, credit, debit, balance: newBalance };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});