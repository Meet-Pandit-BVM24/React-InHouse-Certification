import React, { useEffect, useState } from 'react';
import Tracker from './Tracker';
import Transactions from './Transactions';
import Model from './Model';

import styles from '../css/ExpenseTracker.module.css';

export default function ExpenseTracker() {
    // State to store the balance and expense details
    const [details, setDetails] = useState({
        balance: 0,
        expense: 0
    });

    // State to store the list of transactions
    const [transactions, setTransactions] = useState([]);

    // State to control the modal visibility (add/edit transaction)
    const [isModelOpen, setIsModelOpen] = useState(false);

    // State to keep track of the type of transaction (amount/expense/edit)
    const [type, setType] = useState(''); // Type to be passed to the modal

    // State to store the ID of the transaction being edited
    const [id, setId] = useState(null); // ID to be passed to the modal for editing

    // State to store any error message (e.g., if expense is greater than balance)
    const [error, setError] = useState("");

    // useEffect to check if the expense exceeds the balance
    useEffect(() => {
        // Set an error message if expense is greater than balance
        if (details.expense > details.balance) {
            setError('Expense should be greater than balance');
        } else {
            // Clear the error message if condition is satisfied
            setError('');
        }
    });

    return (
        <>
            {/* Render the Model component only when the modal is open */}
            {isModelOpen && (
                <Model
                    setIsModelOpen={setIsModelOpen} // Function to close the modal
                    details={details} // Pass current balance and expense details
                    setDetails={setDetails} // Function to update balance and expense
                    transactions={transactions} // Pass the list of transactions
                    setTransactions={setTransactions} // Function to update transactions
                    type={type} // Pass the type (add/edit) to the modal
                    id={id} // Pass the selected transaction ID for editing
                    setError={setError} // Function to set the error message if any
                />
            )}

            <div className={styles.expense_tracker}>
                <div className='tracker'>
                    {/* Tracker component to display balance and expense details */}
                    <Tracker
                        setIsModelOpen={setIsModelOpen} // Function to open the modal
                        setType={setType} // Function to set the transaction type (add amount/expense)
                        details={details} // Pass current balance and expense details
                    />
                </div>
                <div className='transactions'>
                    {/* Display error message if any */}
                    {
                        error && <p style={{ color: 'red' }}>{error}</p>
                    }

                    {/* Transactions component to display the list of recent transactions */}
                    <Transactions
                        transactions={transactions} // Pass the list of transactions
                        setIsModelOpen={setIsModelOpen} // Function to open the modal
                        setType={setType} // Function to set the type for edit transaction
                        setId={setId} // Function to set the transaction ID for editing
                        setError={setError} // Function to set error messages, if any
                    />
                </div>
            </div>
        </>
    );
}
