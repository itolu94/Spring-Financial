import React, {Component} from 'react';
import transactionHelper from '../../../util/transactionHelper';
import Item from './Items';

export default class TransactionList extends Component {
    constructor() {
        super();
        this.state= {
            transactions: [],
            search: true
        };
        this.listTransactions = this.listTransactions.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.state) {
            this.setState({search: true})
        }
    }
    listTransactions() {
        let transactions;
        if(this.state.search) {
            this.setState({search: false});
            if (this.props.filterCategory !== "") {
                let category = this.props.filterCategory;
                transactionHelper.getTransactionCategory(category, (resp) => {
                    if (resp.completed && resp.transactions.length > 0)
                        this.setState({transactions: resp.transactions});
                    else {
                        console.log("No transaction in that category or error occurred");
                        this.setState({transactions: this.props.transactions});
                    }
                });
            }
            else if (this.props.filterCategory === "") {
                this.setState({transactions: this.props.transactions});
            }
            else {
                this.setState({transactions: this.state.transactions});
            }
        }
        transactions = this.state.transactions;
        if(transactions.length >= 1) {
            return transactions.map((transaction, index) => {
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

    componentWillMount(){
        this.setState({transactions: this.props.transactions});
    }
    render(){
        return(
            <div>
                {this.listTransactions()}
            </div>
        )
    }
}