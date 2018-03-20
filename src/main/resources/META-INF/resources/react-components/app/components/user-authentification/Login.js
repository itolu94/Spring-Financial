/*jshint esversion: 6 */

import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Helpers from '../../util/helpers';

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
        let {email, password} = this.state;
        let data =  {email, password};
        Helpers.login(data, (resp) => {
            if(resp.completed){
                // resp.token
            }
        })
    }

    registrationPage(){
        this.props.history.push('/registration');
    }

    render() {
        return (
            <div className='verification'>
                <p className='verificationHeader'>Login</p>
                <form onSubmit={this.handleSubmit} action="/login" method="POST">
                    <div >
                        <input onChange={this.handleChange} placeholder='Email'  name='email' type='email' id="email"  required/>
                    </div>
                    <div >
                        <input onChange={this.handleChange} placeholder='Password'  name='password' id="password" type="password" required/>
                    </div>
                    <br/>
                    <input value='Sign In'  className="btn-large btn-signup verificationBtn" type="submit" />
                    <input value='Sign Up' onClick={this.registrationPage} className="btn-large btn-signup verificationBtn" type="submit" />
                </form>
            </div>
        )
    }
}

export default withRouter(Login);
