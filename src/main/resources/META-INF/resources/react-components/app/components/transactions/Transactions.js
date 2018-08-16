import React, {Component} from 'react';
import Item from './Items';
import  TransactionForm from './TransactionForm';
import transactionHelper from '../../util/transactionHelper';
import cookie from 'react-cookies'

export default class Transactions extends Component {
    constructor(){
        super();
        this.state= {
            transactions: [],
            balance:  0,
            category: '',
            amount: '',
            note: '',
        };
        this.listTransactions = this.listTransactions.bind(this);
        this.newTransaction = this.newTransaction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }

    componentWillReceiveProps(nextProps){
            if(nextProps.transactions !== this.state.transactions) {
                let {balance, transactions} = nextProps;
                this.setState({
                    balance,
                    transactions
                })
            }
    }

    deleteTransaction(index){
        let transactions = this.state.transactions;
        let transaction = transactions[index];
        transactionHelper.deleteTransaction(transaction.id, (resp) => {
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
                let sfCookie = cookie.load("sf");
                if(!sfCookie) this.props.history.push("/login");
                else console.log("transaction was not able to be deleted");
            }
        })
    }

    updateNote(transaction, index){
        let transactions = this.state.transactions;
        transactions[index] = transaction;
        this.setState({transactions});
    }

    listTransactions() {
        if(this.state.transactions.length >= 1) {
            return this.state.transactions.map((transaction, index) => {
                    return (
                        <div>
                            <Item
                                transaction={transaction}
                                index={index}
                                key={index}
                                deleteTransaction={this.deleteTransaction}
                                updateNote={this.updateNote}
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
        let {category, amount, note} =  this.state;
        let transaction = { category, amount, note };
        transactionHelper.postTransaction(transaction, (resp) => {
                if(resp.completed){
                    let balance;
                    if(this.state.category === "deposit") balance = parseInt(this.state.balance) + parseInt(this.state.amount);
                    else balance = this.state.balance - this.state.amount;
                    transaction.id = resp.transactionId;
                    this.setState({
                        category,
                        amount,
                        note,
                        balance,
                        transactions: [...this.state.transactions, transaction]
                    });
                }
                else {
                    let sfCookie = cookie.load("sf");
                    if(!sfCookie) this.props.history.push("/login");
                    else console.log("transaction was not able to be added");
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
                    <h3 className="pageHeader">Balance</h3>
                    <p id="balance">{this.state.balance}</p>
                </div>
                <div id='transactionsContent'>
                    <TransactionForm
                        handleChange={this.handleChange}
                        newTransaction={this.newTransaction}
                        amount={this.state.amount}
                        category={this.state.category}
                        note={this.state.note}
                    />
                </div>

                {this.listTransactions()}
            </div>
        )
    }
}
