import React, {Component} from 'react';
import Item from './Items';
import Helpers from '../../util/helpers';

export default class Transactions extends Component {
    constructor(){
        super();
        this.state= {
            transactions: [],
            category: '',
            amount: '',
            note: '',
            balance: 120,
        };
        this.listTransactions = this.listTransactions.bind(this);
        this.newTransaction = this.newTransaction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
    }

    deleteTransaction(index){
        let transactions = this.state.transactions;
        let transaction = transactions[index];
        Helpers.deleteTransaction(transaction.id, (resp) => {
            if(resp.completed){
                let balance;
                if(transaction.category === "deposit") balance = this.state.balance - transaction.amount;
                else balance = parseInt(this.state.balance) + parseInt(transaction.amount);
                transactions.splice(index, 1);
                this.setState({
                    transactions,
                    balance
                });
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
                            <Item
                                transaction={transaction}
                                index={index}
                                key={index}
                                deleteTransaction={this.deleteTransaction}
                            />
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
                    let balance;
                    if(this.state.category === "deposit"){
                        balance = parseInt(this.state.balance) + parseInt(this.state.amount);
                    }
                    else {
                        balance = this.state.balance - this.state.amount;
                    }
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
                    if(transaction.category === "deposit"){
                        balance += transaction.amount;
                    }
                    else {
                        balance -= transaction.amount;
                    }
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
                    <h3 id="balanceHeader">Balance</h3>
                    <p id="balance">{this.state.balance}</p>
                </div>
                <div id='addTransaction'>
                    <form id='newTransactionForm' onSubmit={(e)=> this.newTransaction(e)}>
                        <select className="catagory" value={this.state.category} onChange={(e) => this.handleChange('category', e)} name="category" required>
                            <option value="">Select the best option</option>
                            <option value="shopping">Shopping </option>
                            <option value="car"> Car</option>
                            <option value="food">Food</option>
                            <option value="house">House</option>
                            <option value="medical">Medical</option>
                            <option value="deposit">Deposit</option>
                        </select>
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
