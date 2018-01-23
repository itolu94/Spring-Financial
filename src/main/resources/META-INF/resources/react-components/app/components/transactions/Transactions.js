import React, {Component} from 'react';
import Items from './Items';
import Helpers from '../../util/helpers';


export default class Transactions extends Component {
    constructor(){
        super();
        this.state={
            transactions: [],
            category: '',
            amount: '',
            note: '',
            balance: 120,
        }
        this.listTransactions = this.listTransactions.bind(this);
        this.newTransaction = this.newTransaction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
    }

    deleteTransaction(transactionId, index){
        Helpers.deleteTransaction(transactionId, (resp) => {
            if(resp.completed){
                this.state.transactions.splice(index, 1);
            } else {
                console.log("transaction was not able to be deleted");
            }
        })
    }
    listTransactions() {
        if(this.state.transactions) {
            return this.state.transactions.map((transaction, index) => {
                    return (
                        <div>
                            <Items transaction={transaction} key={index}/>
                        </div>
                    )
            });
        }
        return (
            <div>
                <p>No Transactions added</p>
            </div>
        )
    }
    newTransaction(e){
        e.preventDefault();
            let transaction = {
                category: this.state.category,
                amount: this.state.amount,
                note: this.state.note
            };
            Helpers.postTransaction(transaction, (resp) => {
                if(resp.completed){
                    let balance = this.state.balance - this.state.amount;
                    transaction.id = resp.transactionId;
                    this.setState({
                        category: '',
                        amount: '',
                        note: '',
                        balance,
                        transactions: [...this.state.transactions, transaction]
                    });
                }
                else {
                    console.log('Your transaction was unable to be added');
                }
            });
    }
    handleChange(key, e) {
        this.setState({[key]: e.target.value});
    }
    componentWillMount() {
        Helpers.getTransaction((res) =>{
            let transactionLength = res.length;
            let balance = this.state.balance;
            if(res){
                res.map((transaction, index) => {
                    balance -= transaction.amount;
                    if ((index + 1) === transactionLength) {
                        this.setState({
                            transactions: res,
                            balance
                        });
                    }
                });
            }
        });
    }
    render(){
        return (
            <div>
                <div>
                    Current Balance is {this.state.balance}
                </div>
                <div id='addTransaction'>
                    <form onSubmit={(e)=> this.newTransaction(e)}>
                        <input value={this.state.info} onChange={(e) => this.handleChange('category', e)} type="text" required placeholder='Info'/>
                        <input value={this.state.amount} onChange={(e) => this.handleChange('amount', e)} type="number" required placeholder='Amount'/>
                        <input value={this.state.note} onChange={(e) => this.handleChange('note', e)} type="text" maxLength="50" placeholder='Note'/>
                        <input type="submit"/>
                    </form>
                </div>
                {this.listTransactions()}
            </div>
        )
    }
}