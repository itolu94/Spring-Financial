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
        }
        this.handleNavBar =  this.handleNavBar.bind(this);
        this.changePage = this.changePage.bind(this);
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
    }
    changePage(page){
        this.setState({page});
    }

    handleLoggedIn(authenticated){
        switch(authenticated) {
            case true:
                this.setState({loggedIn: true});
                break;
            case false:
                this.setState({loggedIn: false});
                break;
            default:
                this.setState({loggedIn: false});
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
                                        <Route path='/create-account' component={Registration} />
                                        <Route exact path='/' component={Transactions} handleLoggedIn={this.handleLoggedIn} />
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
