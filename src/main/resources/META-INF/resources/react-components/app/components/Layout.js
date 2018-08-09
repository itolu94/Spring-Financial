/*jshint esversion: 6 */
import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    withRouter

} from 'react-router-dom';
import Registration from './user-authentification/Registration';
import Transactions from "./transactions/Transactions";
import Stocks from './stocks/Stocks';
import Login from './user-authentification/Login';
import Helpers from './../util/helpers';
import cookie from 'react-cookies'

 class Layout extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
        }
        this.handleNavBar =  this.handleNavBar.bind(this);
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
        this.logout = this.logout.bind(this);
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
    logout(e){
        e.preventDefault();
        cookie.remove("sf");
        this.handleLoggedIn(false);
        this.props.history.push('/login');
    }

    handleNavBar(){
        if(this.state.loggedIn){
            return (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Transactions</Link></li>
                    <li><Link to="/stock-market">Stocks</Link></li>
                    <li><a onClick={this.logout}>Logout</a></li>
                </ul>
            )
        } else {
            return (
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/create-account">Signup</Link></li>
                    <li><Link to="/stock-market">Stocks</Link></li>
                </ul>
            )
        }
    }
     componentWillMount() {
         let sfCookie = cookie.load("sf");
         if (sfCookie) {
             this.handleLoggedIn(true);
             Helpers.getTransaction((resp) =>{
                 if(resp){
                     let balance = this.state.balance;
                     resp.map((transaction, index) => {
                         if(transaction.category === "deposit") balance += transaction.amount;
                         else balance -= transaction.amount;
                         if ((index + 1) === resp.length) {
                             this.setState({
                                 transactions: resp,
                                 balance
                             });
                         }
                     });
                 }
             });
         } else {
             this.props.history.push('/login');
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
                                        <Route path='/login' component={Login} />
                                        <Route path='/create-account' component={Registration} />
                                        <Route path='/stock-market' component={Stocks} />
                                        <Route exact path='/' render={(props) => <Transactions {...props} handleLoggedIn={this.handleLoggedIn} />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(Layout)

