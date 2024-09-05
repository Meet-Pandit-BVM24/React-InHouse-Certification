import React, { useEffect, useState } from 'react';
import '../css/model.css'; // Make sure to have the corresponding CSS file for styling

export default function Model({ setIsModelOpen, details, setDetails, transactions, setTransactions, type, id, setError }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const [CurrentTranscation, SetCurrentTranscation] = useState();
    useEffect(() => {
        // Pre-populate fields if editing
        if (type === 'edit' && id) {
            const transaction = transactions.find((trans) => trans.id === id);
            if (transaction) {
                setAmount(transaction.amount);
                setDescription(transaction.description);
                SetCurrentTranscation(transaction);
                console.log(transaction);
            }
        }
    }, [type, id, transactions]);

    const handleSubmit = () => {
        const newTransaction = {
            id: type === 'edit' ? id : Date.now(),
            amount: parseFloat(amount),
            description: description,
        };


        if (type === 'amount') {

            setDetails({
                ...details,
                balance: details.balance + parseFloat(amount)
            });
            newTransaction.transactionType = 'amount';

            setTransactions([...transactions, newTransaction]);
            if (details.expense > details.balance) {
                setError('Expense should be greater than balance');
            }
            else {
                setError('');
            }
        } else if (type === 'expense') {

            setDetails({
                ...details,
                balance: details.balance - parseFloat(amount),
                expense: details.expense + parseFloat(amount),
            });
            newTransaction.transactionType = 'expense';
            setTransactions([...transactions, newTransaction]);

            if (details.expense > details.balance) {
                setError('Expense should be greater than balance');
            }
            else {
                setError('');
            }


        } else if (type === 'edit') {
            newTransaction.transactionType = CurrentTranscation.transactionType;
            const updatedTransactions = transactions.map(transaction =>
                transaction.id === id ? { ...newTransaction } : transaction
            );
            if (CurrentTranscation.transactionType === 'amount') {
                setDetails({
                    ...details,
                    balance: details.balance - parseFloat(CurrentTranscation.amount) + parseFloat(amount)
                })
            }
            else if (CurrentTranscation.transactionType === 'expense') {

                console.log('updatedTransactions', updatedTransactions);

                setDetails({
                    balance: details.balance + parseFloat(CurrentTranscation.amount) - parseFloat(amount),
                    expense: details.expense - parseFloat(CurrentTranscation.amount) + parseFloat(amount)
                })
                if (details.expense > details.balance) {
                    setError('Expense should be greater than balance');
                }
                else {
                    setError('');
                }
            }

            setTransactions(updatedTransactions);


        }
        setAmount('');
        setDescription('');

        setIsModelOpen(false); // Close modal after submission
    };

    const HandleDelete = () => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        if (CurrentTranscation.transactionType === 'amount') {
            setDetails({
                ...details,
                balance: details.balance - parseFloat(CurrentTranscation.amount)
            })
        }
        else if (CurrentTranscation.transactionType === 'expense') {
            setDetails({
                ...details,
                balance: details.balance + parseFloat(CurrentTranscation.amount),
                expense: details.expense - parseFloat(CurrentTranscation.amount)
            })
        }
        setTransactions([...updatedTransactions]);
        setIsModelOpen(false);
    }

    return (
        <div className='modal-overlay' onClick={() => setIsModelOpen(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h3>{type === 'edit' ? 'Edit Transaction' : (type === 'amount' ? 'Add Amount' : 'Add Expense')}</h3>
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
                <button onClick={handleSubmit}>
                    {type === 'edit' ? 'Update' : `Add ${type === 'amount' ? 'Amount' : 'Expense'}`}
                </button>
                <button onClick={() => setIsModelOpen(false)} className='close-btn'><i className="fa-solid fa-xmark fa-2xl"></i></button>
                {
                    type == "edit" && <button onClick={HandleDelete}> Delete </button>
                }
            </div>
        </div>
    );
}
