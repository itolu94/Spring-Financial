import React, {Component} from 'react';


const StocksForm = ({handleChange, searchStock, stock}) => {
    return (
        <div id='stocksContent'>
            <form id='stocksForm' onSubmit={searchStock}>
                <input
                    value={stock}
                    onChange={handleChange}
                    name="stock"
                    type="text"
                    required
                    placeholder='Stock Name'
                />
                <input
                    type="submit"
                />
            </form>
        </div>
    )

}

export default StocksForm