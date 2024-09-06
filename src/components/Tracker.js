import React from 'react';
import styles from '../css/Tracker.module.css';

export default function Tracker({ setIsModelOpen, details, setType }) {
    return (
        <div>
            {/* Section for heading */}
            <div className={styles.heading}>
                <h2>Expense Tracker</h2> {/* Display the heading "Expense Tracker" */}
            </div>

            {/* Section for showing balance and expense */}
            <div className={styles.balancedetails}>
                <div>
                    <p>Balance</p>
                    <h3>$ {details.balance}</h3> {/* Display current balance */}
                </div>
                <div>
                    <p>Expense</p>
                    <h3>${details.expense}</h3> {/* Display total expenses */}
                </div>
            </div>

            {/* Button to add a new amount */}
            <button className={styles.button} onClick={() => {
                setType('amount'); // Set the type as 'amount' for adding a new income/amount
                setIsModelOpen(true); // Open the modal for adding the transaction
            }}>
                Add amount
            </button>

            {/* Button to add a new expense */}
            <button className={styles.button} onClick={() => {
                setType('expense'); // Set the type as 'expense' for adding a new expense
                setIsModelOpen(true); // Open the modal for adding the transaction
            }}>
                Add expense
            </button>
        </div>
    );
}
