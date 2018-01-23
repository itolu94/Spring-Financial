import React, {Component} from 'react';

export default class Items extends Component{
 constructor(){
     super()
 }
 render(){
    return (
        <div className='transactions card '>
            <div className="deleteIcon">
                <i onClick={()=> this.props.deleteTransaction(index)} className="material-icons">close</i>
            </div>
            <div className="card-content transactionCard">
                <p>Category: {this.props.transaction.info}</p>
                <p>Amount: ${this.props.transaction.amount}</p>
                <p>Note: {this.props.transaction.note}</p>
            </div>
        </div>
    )
 }
}



