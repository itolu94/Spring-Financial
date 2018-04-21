import React, {Component} from 'react';
import Helpers from '../../util/helpers';
import StocksForm from './StocksForm';
import StockGraph from './StockGraph';

export default class Stocks extends Component {
    constructor(){
        super();
        this.state= {
            transactions: '',
            stock: '',
            stockData: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchStock = this.searchStock.bind(this);

    }
    searchStock(e){
        e.preventDefault();
        let {stock} = this.state;
        Helpers.getStocks(stock, (resp) => {
            if(resp.completed){
                this.setState({stockData: resp.data});
            } else {
                //TODO create proper error handling!
                console.log(resp);
            }
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return (
            <div>
                <div>
                    <h3 className="pageHeader">Stocks</h3>
                </div>
                <StocksForm
                    handleChange={this.handleChange}
                    stock={this.state.stock}
                    searchStock={this.searchStock}
                />
                <StockGraph
                    stockData={this.state.stockData}
                />
            </div>
        )
    }
}
