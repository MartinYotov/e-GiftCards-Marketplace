import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                repeatPassword: ''
            },
            redirect: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        const credentials = this.state.credentials;
        credentials[name] = value;

        this.setState({
            credentials
        });
    }

    handleSubmit(event) {
        if (this.state.credentials.password !== this.state.credentials.repeatPassword) {
            toast.error("Passwords don't match");
            event.preventDefault();
            return;
        };
        axios.post('http://localhost:3030/api/user/register', this.state.credentials)
            .then((response) => {
                toast.success(response.data.message);
                setTimeout(() => {
                    this.setState({
                        redirect: true
                    });
                }, 1500);
            })
            .catch(function (error) {
                toast.error(error.message);

            });
        event.preventDefault();
    }


    render() {

        const {redirect} = this.state;

        if (redirect) {
            return (<Redirect to={{pathname: '/'}}/>);
        }

        return (
            <div className="form-wrapper">
                <form className="form-register" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        onChange={this.handleInputChange}/>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        onChange={this.handleInputChange}/>

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        onChange={this.handleInputChange}/>

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={this.handleInputChange}/>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required=""
                        onChange={this.handleInputChange}/>

                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        type="password"
                        name="repeatPassword"
                        className="form-control"
                        placeholder="Password"
                        required=""
                        onChange={this.handleInputChange}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                    <ToastContainer autoClose={3000}/>
                </form>
            </div>
        )
    }
}

export default Register;