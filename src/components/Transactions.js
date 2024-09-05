import React from 'react';
import styles from '../css/Transactions.module.css';

export default function Transactions({ transactions, setIsModelOpen, setType, setId }) {
    function handleClick(id) {
        console.log(id, "in transactions");
        setType('edit');
        setId(id); // Pass the transaction ID to the parent
        setIsModelOpen(true); // Open modal
    }

    return (
        <div className='transactions'>
            <h2>Recent Transactions</h2>
            {transactions.length > 0 ? (
                <div>
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={styles.transaction}
                            onClick={() => handleClick(transaction.id)} // Set the correct ID
                        >

                            <div>
                                {  
                                    // Display the transaction type icon
                                    (transaction.transactionType === 'amount') ? <i className="fa-solid fa-caret-up fa-xl" style={{ color: 'green' }}></i>
                                        : <i class="fa-solid fa-caret-down fa-xl" style={{ color: "red" }}></i>

                                }
                            </div>
                            <p>{transaction.description}</p>
                            <p><strong>${transaction.amount}</strong> </p>

                        </div>
                    ))}
                </div>
            ) : (
                <p>No Transactions Done</p>
            )}
        </div>
    );
}
