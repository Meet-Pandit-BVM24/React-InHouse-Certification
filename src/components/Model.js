import React, { useEffect, useState } from 'react';
import '../css/model.css'; // Make sure to have the corresponding CSS file for styling

export default function Model({ setIsModelOpen, details, setDetails, transactions, setTransactions, type, id, setError }) {
    const [amount, setAmount] = useState(''); // Store the input amount
    const [description, setDescription] = useState(''); // Store the input description
    const [CurrentTransaction, SetCurrentTransaction] = useState(); // Store the current transaction when editing

    useEffect(() => {
        // Pre-populate fields if the modal is opened for editing a transaction
        if (type === 'edit' && id) {
            const transaction = transactions.find((trans) => trans.id === id);
            if (transaction) {
                setAmount(transaction.amount); // Pre-fill the amount
                setDescription(transaction.description); // Pre-fill the description
                SetCurrentTransaction(transaction); // Set the current transaction for use in editing
                console.log(transaction);
            }
        }
    }, [type, id, transactions]);

    // Handle form submission for adding/editing transactions
    const handleSubmit = () => {
        const newTransaction = {
            id: type === 'edit' ? id : Date.now(), // Generate an ID for new transactions, keep the same for editing
            amount: parseFloat(amount),
            description: description,
        };

        if (type === 'amount') {
            // Adding an amount to the balance
            setDetails({
                ...details,
                balance: details.balance + parseFloat(amount),
            });
            newTransaction.transactionType = 'amount';
            setTransactions([...transactions, newTransaction]); // Add to the transactions array

            if (details.expense > details.balance) {
                setError('Expense should be greater than balance');
            } else {
                setError('');
            }
        } else if (type === 'expense') {
            // Adding an expense to the balance
            setDetails({
                ...details,
                balance: details.balance - parseFloat(amount),
                expense: details.expense + parseFloat(amount),
            });
            newTransaction.transactionType = 'expense';
            setTransactions([...transactions, newTransaction]); // Add the expense transaction

            if (details.expense > details.balance) {
                setError('Expense should be greater than balance');
            } else {
                setError('');
            }
        } else if (type === 'edit') {
            // Editing an existing transaction
            newTransaction.transactionType = CurrentTransaction.transactionType; // Keep the original transaction type
            const updatedTransactions = transactions.map(transaction =>
                transaction.id === id ? { ...newTransaction } : transaction
            );

            // Update balance and expense based on transaction type
            if (CurrentTransaction.transactionType === 'amount') {
                setDetails({
                    ...details,
                    balance: details.balance - parseFloat(CurrentTransaction.amount) + parseFloat(amount),
                });
            } else if (CurrentTransaction.transactionType === 'expense') {
                setDetails({
                    balance: details.balance + parseFloat(CurrentTransaction.amount) - parseFloat(amount),
                    expense: details.expense - parseFloat(CurrentTransaction.amount) + parseFloat(amount),
                });

                if (details.expense > details.balance) {
                    setError('Expense should be greater than balance');
                } else {
                    setError('');
                }
            }

            setTransactions(updatedTransactions); // Update the transactions array with the edited transaction
        }

        setAmount(''); // Reset the form fields
        setDescription('');
        setIsModelOpen(false); // Close the modal
    };

    // Handle deletion of a transaction
    const HandleDelete = () => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id); // Remove the selected transaction

        if (CurrentTransaction.transactionType === 'amount') {
            setDetails({
                ...details,
                balance: details.balance - parseFloat(CurrentTransaction.amount), // Adjust balance if it's an amount
            });
        } else if (CurrentTransaction.transactionType === 'expense') {
            setDetails({
                ...details,
                balance: details.balance + parseFloat(CurrentTransaction.amount), // Adjust balance and expense if it's an expense
                expense: details.expense - parseFloat(CurrentTransaction.amount),
            });
        }

        setTransactions([...updatedTransactions]); // Update the transaction list after deletion
        setIsModelOpen(false); // Close the modal after deletion
    };

    return (
        <div className='modal-overlay' onClick={() => setIsModelOpen(false)}> {/* Modal overlay */}
            <div className='modal-content' onClick={(e) => e.stopPropagation()}> {/* Modal content */}
                <h3>{type === 'edit' ? 'Edit Transaction' : (type === 'amount' ? 'Add Amount' : 'Add Expense')}</h3> {/* Dynamic heading based on type */}

                <input
                    type='number'
                    placeholder='Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                {/* Button for adding or editing transactions */}
                <button onClick={handleSubmit}>
                    {type === 'edit' ? 'Update' : `Add ${type === 'amount' ? 'Amount' : 'Expense'}`}
                </button>

                {/* Button to close the modal */}
                <button onClick={() => setIsModelOpen(false)} className='close-btn'><i className="fa-solid fa-xmark fa-2xl"></i></button>

                {/* Button to delete a transaction (only shown when editing) */}
                {type === "edit" && <button onClick={HandleDelete}> Delete </button>}
            </div>
        </div>
    );
}
