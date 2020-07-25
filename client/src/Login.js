import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import axios from 'axios';
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: '',
            },
            redirect: false,
            from: this.props.location.state
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
        axios.post('http://localhost:3030/api/user/login', this.state.credentials, {headers: {'Accept': 'application/json'}})
            .then((response) => {
                localStorage.setItem('egc-username', response.data.user.username);
                localStorage.setItem('token', response.data.user.token);
                toast.success(response.data.message);
                
                setTimeout(() => {
                    this.props.logInHandler();
                    this.setState({
                        redirect: true
                    });
                }, 1500);

            })
            .catch((error) => {
                toast.error(error.response ? error.response.data.error.message : "Error reaching server");
            });
        event.preventDefault();
    }


    render() {
        const {redirect, from} = this.state;

        if (redirect)
            return (
                <Redirect to={{
                    pathname: from ? from : '/gift-cards'
                }}/>);


        return (
            <div className="login-form-wrapper">
                <form className="form-login" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        onChange={this.handleInputChange}/>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required=""
                        onChange={this.handleInputChange}/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
                    <ToastContainer autoClose={3000}/>

                </form>
            </div>
        )
    }
}

export default Login;