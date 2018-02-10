/*jshint esversion: 6 */

import React, {Component} from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state={
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('You Tried to Login!');
    }
    render() {
        return (
            //TODO update inputs to have materialize label animation.
            <div className='verification'>
                <p className='verificationHeader'>Login</p>
                <form onSubmit={this.handleSubmit} action="/login" method="POST">
                    <div >
                        <input onChange={this.handleChange} placeholder='Email' required name='email' type='email' id="email"  />
                    </div>
                    <div >
                        <input onChange={this.handleChange} placeholder='Password' required name='password' id="password" type="password"/>
                    </div>
                    <br/>
                    <input value='Sign Up' className="btn-large btn-signup verificationBtn" type="submit" />
                </form>
            </div>
        )
    }
}

export default Login;
