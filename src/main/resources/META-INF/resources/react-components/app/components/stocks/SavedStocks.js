import React, {Component} from 'react';


export default class SavedStocks extends Component {
    constructor(){
        super();
        this.generateButtons= this.generateButtons.bind(this);
    }

    shouldComponentUpdate(nextProps){
        return this.props.savedStocks !==  nextProps.savedStocks;
    }

    generateButtons(){
        let savedStocks = this.props.savedStocks;
        if(savedStocks.length > 0) {
            return savedStocks.map((stock) => {
                return (
                    <div className='sSInnerDiv'>
                        <button className='sSBtn'>{stock}</button>
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