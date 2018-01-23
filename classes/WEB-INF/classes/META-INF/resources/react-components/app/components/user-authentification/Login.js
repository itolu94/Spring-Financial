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
    handleChange(key, value){
        this.setState({[key]: value });
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('You Tried to Login!');
    }
    render() {
        return (
            <div>
                <form onSubmit={()=> this.handleSubmit(e)} action="/login" method="POST">
                    <div class="form-group">
                        <label for="email" >Email</label>
                        <input onChange={() => this.handleChange('email', e.target.value)} required name='email' type='email' id="email"  />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input onChange={() => this.handleChange('password', e.target.value)} required name='password' id="password" type="password"/>
                    </div>
                    <br/>
                    <input value='Sign Up' class="btn-large btn-signup" type="submit" />
                </form>
            </div>
        )
    }
}

export default Login;
