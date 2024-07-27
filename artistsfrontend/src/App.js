import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionTable from './components/TransactionTable/TransactionTable';
import AddTransaction from './components/AddTransaction/AddTransaction';
import './App.css'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<TransactionTable />} />
                <Route path="/add" element={<AddTransaction />} />
            </Routes>
        </Router>
    );
};

export default App;