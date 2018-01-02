/*jshint esversion: 6 */
import React ,{Component} from 'react';
import Transactions from './Transactions/Transactions';

export default class Main extends Component{
    constructor(){
        super();
        this.state = {
            balance: 100
        };

    }


    render(){
        return (
            <div className="row center-align">
                <div className="col l8 offset-l2" id='content'>

                    <div id='transactionsList'>
                        <Transactions
                        />
                    </div>
                </div>
            </div>
        )
    }
}