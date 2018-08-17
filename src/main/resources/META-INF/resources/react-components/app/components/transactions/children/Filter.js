import React from 'react';

const TransactionFilter = ({filterCategory, handleChange}) => {

    return (
        <div className="filterDiv">
            <select className="filterCategory" value={filterCategory} onChange={handleChange} name="filterCategory" required>
                <option value="">Filter by</option>
                <option value="shopping">Shopping </option>
                <option value="car"> Car</option>
                <option value="food">Food</option>
                <option value="house">House</option>
                <option value="medical">Medical</option>
                <option value="deposit">Deposit</option>
            </select>
        </div>
    )
};

export default TransactionFilter