import React, {Component} from 'react';
import Helpers from '../../util/helpers';
import StocksForm from './StocksForm';
import StockGraph from './StockGraph';
import SavedStocks from './SavedStocks';

export default class Stocks extends Component {
    constructor(){
        super();
        this.state= {
            transactions: '',
            stock: '',
            stockData: {},
            savedStocks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchStock = this.searchStock.bind(this);
        this.saveStock = this.saveStock.bind(this);
    }

    searchStock(e){
        e.preventDefault();
        let {stock} = this.state;
        Helpers.getStocks(stock, (resp) => {
            if(resp.completed){
                this.setState({stockData: resp.data});
            } else {
                //TODO create proper error handling!
                this.setState({stockData: {}});
                console.log(resp);
            }
        })
    }

    saveStock(e){
        e.preventDefault();
        let stock = this.state.stock;
        Helpers.saveStock(stock, (resp) =>{
            if(resp.completed) {
                let savedStocks = this.state.savedStocks.slice();
                savedStocks.push(stock);
                this.setState({savedStocks});
            } else {
                console.log('Stock was unable to be saved');
            }
        });
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
                <SavedStocks
                    savedStocks={this.state.savedStocks}
                />
                <StockGraph
                    stockData={this.state.stockData}
                    saveStock={this.saveStock}
                />
            </div>
        )
    }
}
