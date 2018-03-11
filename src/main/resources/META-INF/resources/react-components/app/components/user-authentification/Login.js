/*jshint esversion: 6 */

import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state={
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registrationPage = this.registrationPage.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('You Tried to Login!');
    }

    registrationPage(){
        this.props.history.push('/registration');
    }
    render() {
        return (
            <div className='verification'>
                <p className='verificationHeader'>Loginnn</p>
                <form onSubmit={this.handleSubmit} action="/login" method="POST">
                    <div >
                        <input onChange={this.handleChange} placeholder='Email' required name='email' type='email' id="email"  />
                    </div>
                    <div >
                        <input onChange={this.handleChange} placeholder='Password' required name='password' id="password" type="password"/>
                    </div>
                    <br/>
                    <input value='Sign In'  className="btn-large btn-signup verificationBtn" type="button" />
                    <input value='Sign Up' onClick={this.registrationPage} className="btn-large btn-signup verificationBtn" type="submit" />
                </form>
            </div>
        )
    }
}

export default withRouter(Login);
