import React, {Component} from 'react';
import  stocksHelper from '../../util/stocksHelper';
import StocksForm from './StocksForm';
import StockGraph from './StockGraph';
import UsersStocks from './UsersStocks';

export default class Stocks extends Component {
    constructor(){
        super();
        this.state= {
            stock: '',
            stockData: {},
            usersStocks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchForStock = this.searchForStock.bind(this);
        this.saveStock = this.saveStock.bind(this);
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.usersStocks !== this.state.usersStocks) {
            let {usersStocks} = nextProps;
            this.setState({
                usersStocks
            })
        }
    }

    searchForStock(e, contex){
        e.preventDefault();
        let stock =  this.state.stock || contex;
        stocksHelper.getStocks(stock, (resp) => {
            if(resp.completed){
                this.setState({stockData: resp});
            } else {
                //TODO create proper error handling!
                this.setState({stockData: {}});
                console.log(resp);
            }
        })
    }

    saveStock(e, stockName){
        e.preventDefault();
        if(stockName !== ""){
            stocksHelper.saveStock(stockName, (resp) =>{
                if(resp.completed) {
                    let usersStocks = this.state.usersStocks.slice();
                    usersStocks.push(stockName);
                    this.setState({usersStocks});
                } else {
                    console.log('Stock was unable to be saved');
                }
            });
        }

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
                    searchForStock={this.searchForStock}
                />
                <UsersStocks
                    usersStocks={this.state.usersStocks}
                    searchForStock={this.searchForStock}
                />
                <StockGraph
                    stockData={this.state.stockData}
                    saveStock={this.saveStock}
                />
            </div>
        )
    }
}
