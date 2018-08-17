import React, {Component} from 'react';
import transactionHelper from '../../../util/transactionHelper';



export default class Items extends Component{
     constructor(){
         super();
         this.state = {
             editing: false,
             note: ''
         };
         this.itemIcon = this.itemIcon.bind(this);
         this.editNote = this.editNote.bind(this);
         this.transactionNote = this.transactionNote.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.putNote = this.putNote.bind(this);
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
    editNote(){
        this.setState({editing: true});
    }

    handleChange(e){
        this.setState({note: e.target.value});
    }

    putNote(e){
        e.preventDefault();
        let transaction = this.props.transaction;
        transaction.note = this.state.note;
        transactionHelper.updateTransaction(transaction, (resp) =>{
            if(resp.completed){
                this.setState({editing: false});
                this.props.updateNote(transaction, index);
            } else {
                console.log('note could not be updated');
            }
        });
    }
    transactionNote(){
        if(this.state.editing){
            return (
                <div>
                    <form onSubmit={this.putNote}>
                        <input className='editNoteSubmitInp' onChange={this.handleChange} value={this.state.note} />
                        <input maxLength="25" className='editNoteSubmitBtn' type="submit"/>
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
        let style = {
            "backgroundImage": "url('../../../../img/cards/" + this.props.transaction.category +  ".jpg')"
        }
    return (
        <div className='transactions card '>
            <div className="cardBackground"  style={style}>
            </div>
            <div className="card-content transactionCard">
                <div className="deleteIcon">
                    <button><i onClick={()=> this.props.deleteTransaction(this.props.index)} className="material-icons">close</i></button>
                </div>
                <div className="catagoryIcon">
                    <i alt={this.props.transaction.category} className="material-icons">{this.itemIcon()}</i>
                </div>
                <div className='transactionDetails'>
                    <p className='transactionAmount'>${this.props.transaction.amount}</p>
                    {this.transactionNote()}
                </div>
            </div>

        </div>
    )
 }
}