/*jshint esversion: 6 */
import React, {Component} from 'react';
import Registration from './user-authentification/Registration';
import Transactions from "./transactions/Transactions";
import Login from './user-authentification/Login';

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            logggedIn: false,
            page: 'transactions'
        }
        this.handleNavBar =  this.handleNavBar.bind(this);
        this.changePage = this.changePage.bind(this);
        this.handleComponent = this.handleComponent.bind(this);
    }
    changePage(page){
        this.setState({page});
    }

    handleComponent(){
        switch (this.state.page){
            case 'transactions':
                return <Transactions/>
            case 'sign-up':
                return <Registration/>
            case 'login':
                return <Login />
            default:
                return <Transactions/>
        }
    }

    handleNavBar(){
        if(this.state.logggedIn){
            return (
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                     <li><a onClick={() => this.changePage('transactions')}>Transactions</a></li>
                </ul>
            )
        } else {
            return (
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a onClick={() => this.changePage('login')}>Login</a></li>
                    <li><a onClick={() => this.changePage('sign-up')}>Sign-Up</a></li>
                    <li><a onClick={() => this.changePage('transactions')}>Transactions</a></li>
                </ul>
            )
        }
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">Spring Financial Assistance </a>
                        {this.handleNavBar()}
                    </div>
                </nav>
                <div id="pageContent" className="container">
                    <div className="row center-align">
                        <div className="col l8 offset-l2" id='content'>
                            <div id='transactionsList'>
                                {this.handleComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout;
