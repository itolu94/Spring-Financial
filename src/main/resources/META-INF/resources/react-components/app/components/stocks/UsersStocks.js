import React, {Component} from 'react';


export default class SavedStocks extends Component {
    constructor(){
        super();
        this.generateButtons= this.generateButtons.bind(this);
    }

    shouldComponentUpdate(nextProps){
        return this.props.usersStocks !==  nextProps.usersStocks;
    }

    generateButtons(){
        let usersStocks = this.props.usersStocks;
        if(usersStocks.length > 0) {
            return usersStocks.map((stock) => {
                return (
                    <div className='sSInnerDiv'>
                        <input type="button" onClick={(e) => this.props.searchForStock(e, this)} value={stock} className='sSBtn' />
                    </div>
                )
            })
        }
    }

    render(){
        return (
            <div className='sSOuterDiv' >
                {this.generateButtons()}
            </div>
        )

    }
}