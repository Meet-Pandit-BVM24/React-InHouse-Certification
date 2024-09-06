import React from 'react';
import styles from '../css/Transactions.module.css';

export default function Transactions({ transactions, setIsModelOpen, setType, setId }) {

    // Handle click on a transaction item
    function handleClick(id) {
        console.log(id, "in transactions");
        setType('edit'); // Set type to 'edit' so that the modal knows it's for editing
        setId(id); // Pass the transaction ID to the parent to identify which transaction is being edited
        setIsModelOpen(true); // Open the modal for editing
    }

    return (
        <div className='transactions'>
            <h2>Recent Transactions</h2> {/* Section title */}

            {transactions.length > 0 ? (
                <div>
                    {/* Iterate over transactions and render each one */}
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={styles.transaction} // Apply styling for each transaction
                            onClick={() => handleClick(transaction.id)} // Handle click for editing
                        >
                            <div>
                                {
                                    // Display transaction type icon: Up arrow for 'amount', down arrow for 'expense'
                                    (transaction.transactionType === 'amount')
                                        ? <i className="fa-solid fa-caret-up fa-xl" style={{ color: 'green' }}></i>
                                        : <i class="fa-solid fa-caret-down fa-xl" style={{ color: "red" }}></i>
                                }
                            </div>
                            <p>{transaction.description}</p> {/* Transaction description */}
                            <p><strong>${transaction.amount}</strong> </p> {/* Transaction amount */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Transactions Done</p> // Message to show when no transactions exist
            )}
        </div>
    );
}
