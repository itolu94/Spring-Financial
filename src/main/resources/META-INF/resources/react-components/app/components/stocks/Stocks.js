import React, {Component} from 'react';
import Helpers from '../../util/helpers';

export default class Stocks extends Component {
    constructor(){
        super();
        this.state= {
            transactions: '',
            stock: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchStock = this.searchStock.bind(this);

    }
    searchStock(e){
        e.preventDefault();
        console.log('you tried to search for a stock');
        let {stock} = this.state;
        Helpers.getStocks(stock, (resp) => {
            if(!resp.completed){
                console.log('error getting stock');
            } else {
                console.log(resp);
            }
        })
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    componentWillMount() {
    }
    render(){
        return (
            <div>
                <div>
                    <h3 className="pageHeader">Stocks</h3>
                </div>
                <div id='stocksContent'>
                    <form id='stocksForm' onSubmit={this.searchStock}>
                        <input
                            value={this.state.stock}
                            onChange={this.handleChange}
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
            </div>
        )
    }
}
