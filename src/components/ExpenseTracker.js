import React, { useEffect, useState } from 'react';
import Tracker from './Tracker';
import Transactions from './Transactions';
import Model from './Model';

import styles from '../css/ExpenseTracker.module.css';

export default function ExpenseTracker() {
    const [details, setDetails] = useState({
        balance: 0,
        expense: 0
    });
    const [transactions, setTransactions] = useState([]);

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [type, setType] = useState(''); // State to pass into model for  transaction type (amount/expense/edit)
    const [id, setId] = useState(null);   // State to pass into model for selected transaction ID
    const [error, setError] = useState("");

    useEffect(() => {
        if (details.expense > details.balance) {
            setError('Expense should be greater than balance');
        }
        else {
            setError('');
        }
    });

    return (
        <>
            {isModelOpen && (
                <Model
                    setIsModelOpen={setIsModelOpen}
                    details={details}
                    setDetails={setDetails}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    type={type} // Pass transaction type (add/edit)
                    id={id}     // Pass transaction ID for editing
                    setError={setError}
                />
            )}

            <div className={styles.expense_tracker}>
                <div className='tracker'>
                    <Tracker setIsModelOpen={setIsModelOpen} setType={setType} details={details} />
                </div>
                <div className='transactions'>
                    {
                        error && <p style={{ color: 'red' }}>{error}</p>
                    }
                    <Transactions
                        transactions={transactions}
                        setIsModelOpen={setIsModelOpen}
                        setType={setType}
                        setId={setId} // Set ID on click
                        setError={setError}
                    />
                </div>
            </div>
        </>
    );
}
