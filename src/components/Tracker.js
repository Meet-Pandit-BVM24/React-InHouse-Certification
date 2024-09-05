import React from 'react';
import styles from '../css/Tracker.module.css';

export default function Tracker({ setIsModelOpen, details, setType }) {
    return (
        <div>
            <div className={styles.heading}>
                <h2>Expense Tracker</h2>
            </div>
            <div className={styles.balancedetails}>
                <div>
                    <p>Balance</p>
                    <h3>$ {details.balance}</h3>
                </div>
                <div>
                    <p>Expense</p>
                    <h3>${details.expense}</h3>
                </div>
            </div>

            <button className={styles.button} onClick={() => {
                setType('amount')
                setIsModelOpen(true);
            }}> Add amount </button>

            <button className={styles.button} onClick={() => {
                setType('expense')
                setIsModelOpen(true);
            }}> Add expense</button>
        </div>
    );
}
