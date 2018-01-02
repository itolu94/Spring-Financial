import React, {Component} from 'react';
const log = [
    {
        amount: 20,
        info: "movies"
    },
    {
        amount: 100,
        info: "groceries",
        note: 'extra because of thanksgiving.'
    },
    {
        amount: 7,
        info: "others",
        note: '7Eleven stop.'
    }
];

export default class Transactions extends Component {
    constructor(){
        super();
        this.state={
            transactions: log,
            info: '',
            amount: '',
            note: '',
            balance: 120,
        }
        this.listTransactions = this.listTransactions.bind(this);
        this.newTransaction = this.newTransaction.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    listTransactions() {
        if(this.state.transactions) {
            // let transactionLength = this.state.transactions.length;
            // let balance = this.state.balance;
            return this.state.transactions.map((transaction, index) => {
                // balance -= transaction.amount;
                // if((index + 1) === transactionLength);{
                //     // this.updateBalance({balance});
                // }
                if(transaction.note){
                    return (
                            <div key={index} className='transactions card'>
                                <div className="card-content ">
                                    <p>Category: {transaction.info}</p>
                                    <p>Amount: ${transaction.amount}</p>
                                    <p>Note: {transaction.note}</p>
                                </div>
                            </div>
                    )
                } else {
                    return (
                        <div key={index} className='transactions card'>
                            <div className="card-content ">
                                <p>Category: {transaction.info}</p>
                                <p>Amount: ${transaction.amount}</p>
                            </div>
                        </div>
                    )
                }
            })
        }
        return (
            <div>
                <p>No Transactions added</p>
            </div>
        )
    }
    newTransaction(){
        if(this.state.info && this.state.amount ){
            let balance = this.state.balance - this.state.amount;
            let info, amount, note = '';
            let transaction = {
                amount: this.state.amount,
                info: this.state.info,
                note: this.state.note
            };
            this.setState({
                info,
                amount,
                note,
                balance,
                transactions: [...this.state.transactions, transaction]
            });
        } else {
            console.log('write conditional statement');
        }
    }
    handleChange(key, e){
        if(key === 'note'){
            if(e.target.value.length <= 50){
                this.setState({[key]: e.target.value});
            }
            else {
                //TODO change to text alerting that character limit reached
                alert("character limit reached!");

            }
        } else {
            this.setState({[key]: e.target.value});
        }
    }
    componentWillMount() {
        let transactionLength = this.state.transactions.length;
        let balance = this.state.balance;
        this.state.transactions.map((transaction, index) => {
            balance -= transaction.amount;
            if ((index + 1) === transactionLength) ;
            {
                this.setState({balance});
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
                        <input value={this.state.info} onChange={(e) => this.handleChange('info', e)} type="text" placeholder='Info'/>
                        <input value={this.state.amount} onChange={(e) => this.handleChange('amount', e)} type="number" placeholder='Amount'/>
                        <input value={this.state.note} onChange={(e) => this.handleChange('note', e)} type="text" placeholder='Note'/>
                        <input onClick={()=> this.newTransaction()} type="submit"/>
                </div>
                {this.listTransactions()}
            </div>
        )
    }
}