import React, {Component} from 'react';
import Helpers from '../../util/helpers';

export default class Items extends Component{
     constructor(){
         super();
         this.state = {
             editing: false,
             note: 'this.props.transaction.note'
         };
         this.itemIcon = this.itemIcon.bind(this);
         this.updateNote = this.updateNote.bind(this);
         this.editNote = this.editNote.bind(this);
         this.transactionNote = this.transactionNote.bind(this);
         this.handleChange = this.handleChange.bind(this);
     }
     itemIcon (){
         switch(this.props.transaction.category){
             case 'shopping':
                return 'local_offer';
             case 'car':
                 return 'local_taxi';
             case 'food':
                 return 'restaurant';
             case 'house':
                 return 'home';
             case 'medical':
                 return 'local_hospital';
             case 'deposit':
                 return 'attach_money';
             default:
                 return 'local_offer';
         }
}

    updateNote(){
        // Helpers.updateNote();
        console.log('note would have been updated in database');
        this.setState({editing: false});
     }


    editNote(){
        this.setState({editing: true});
    }

    handleChange(e){
        this.setState({note: e.target.value});
    }

    transactionNote(){
        if(this.state.editing){
            return (
                <div>
                    <form onSubmit={this.updateNote}>
                        <input onChange={this.handleChange} value={this.state.note} />
                        <input className='editNoteSubmitBtn' type="submit"/>
                    </form>
                </div>
            )
        } else {
            return (
                <div >
                    <p onDoubleClick={this.editNote}>{this.props.transaction.note}</p>
                </div>)
        }
    }
    componentWillMount(){
        this.setState({note: this.props.transaction.note})
    }
 render(){
    return (
        <div className='transactions card '>
            <div className="deleteIcon">
                <i onClick={()=> this.props.deleteTransaction(this.props.index)} className="material-icons">close</i>
            </div>
            <div className="catagoryIcon">
                <i alt={this.props.transaction.category} className="material-icons">{this.itemIcon()}</i>
            </div>
            <div className="card-content transactionCard">
                <p className='transactionAmount'>${this.props.transaction.amount}</p>
                {this.transactionNote()}
            </div>
        </div>
    )
 }
}