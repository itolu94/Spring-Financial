import React, {Component} from 'react';


const StocksForm = ({handleChange, searchForStock, stock}) => {
    return (
        <div className='stocksContent'>
            <form className='stocksForm' onSubmit={searchForStock}>
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