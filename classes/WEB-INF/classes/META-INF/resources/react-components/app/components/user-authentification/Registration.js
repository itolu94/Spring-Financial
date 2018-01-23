/*jshint esversion: 6 */
import React, {Component} from 'react';

class Registration extends Component {
    constructor() {
        super();
        this.state={
            name: '',
            email: '',
            password: '',
            password2: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(key, value){
        this.setState({[key]: value });
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('Account was about to be created!');
    }
    render() {
        return (
            <div>
                <form onSubmit={()=> this.handleSubmit(e)} action="/create-account" method="POST">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input onChange={() => this.handleChange('name', e.target.value)} required name='name' id="name" type="text"  />
                    </div>
                    <div class="form-group">
                        <label for="email" >Email</label>
                        <input onChange={() => this.handleChange('email', e.target.value)} required name='email' type='email' id="email"  />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input onChange={() => this.handleChange('password', e.target.value)} required name='password' id="password" type="password"/>
                    </div>
                    <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <input onChange={() => this.handleChange('password2', e.target.value)} required name='password2' id="password2" type="password"/>
                    </div>
                    <br/>
                        <input value='Sign Up' class="btn-large btn-signup" type="submit" />
                </form>
            </div>
        )
    }
}

export default Registration;
