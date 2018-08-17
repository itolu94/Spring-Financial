import React from 'react';

const TransactionForm = ({category, handleChange, note, amount, newTransaction}) => {

    return (
        <form id='newTransactionForm' onSubmit={newTransaction}>
            <select className="category" value={category} onChange={handleChange} name="category" required>
                <option value="">Select the best option</option>
                <option value="shopping">Shopping </option>
                <option value="car"> Car</option>
                <option value="food">Food</option>
                <option value="house">House</option>
                <option value="medical">Medical</option>
                <option value="deposit">Deposit</option>
            </select>
            <input value={amount} onChange={handleChange} name="amount" type="number" required placeholder='Amount'/>
            <input value={note} onChange={handleChange} name='note' type="text" maxLength="25" placeholder='Note'/>
            <input type="submit"/>
        </form>
    )
};

export default TransactionForm