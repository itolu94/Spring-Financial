/*jshint esversion: 6 */
import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import Registration from './user-authentification/Registration';
import Transactions from "./transactions/Transactions";
import Login from './user-authentification/Login';

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
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
        if(this.state.loggedIn){
            return (
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                     <li><a onClick={() => this.changePage('transactions')}>Transactions</a></li>
                </ul>
            )
        } else {
            return (
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/create-account">Signup</Link></li>
                </ul>
            )
        }
    }
    userAuthentification(){
        switch(loggedIn){

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
                    <div id="pageContent">
                        <div className="row center-align">
                            <div className="col s8 offset-s2" id='content'>
                                <div id='transactionsList'>
                                    <Switch>
                                        <Route path='/login' component={Login} />
                                        <Route exact path='/' component={Transactions} loggedIn={this.state.loggedIn} />
                                        <Route path='/create-account' component={Registration} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Layout;
