import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import './Navbar.css';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        const path = window.location.pathname.split('/')[1];
        this.updateActiveLi(document.getElementById(path));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.updateActiveLi(document.getElementById('gift-cards'));
        }
    }
    updateActiveLi(param) { 

        const active = document.getElementsByClassName('active')[0];
       
        if (!param) {
            if (active) {
                active.classList.remove('active');
            }
            return;
        }
        if (param.tagName === 'LI') {
            if (active) {
                active.classList.remove('active');
            }
            param.classList.add('active');

        } else if (param.target.tagName === 'A') {
            if (active) {
                active.classList.remove('active');
            }
            param.target.parentElement.classList.add('active');
        }
    }

    logout() {
        localStorage.removeItem('egc-username');
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        
        setTimeout(() => {
            this.props.logOutHandler();
            this.setState({
                redirect: true
            });
        }, 1500);
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            this.setState({
                redirect: false
            });
            
            return (<Redirect to={{pathname: '/'}}/>);
        }

        let isAuthenticated = this.props.isLoggedIn;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <Link to="/" className="navbar-brand" onClick={event => this.updateActiveLi(document.getElementById('gift-cards'))}>e-GiftCards</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav" onClick={this.updateActiveLi}>
                    <ul className="navbar-nav">
                        <li id="gift-cards" className="nav-item active">
                            <Link to="/" className="nav-link">Gift Cards</Link>
                        </li>
                        <li id="stores" className="nav-item">
                            <Link to="/stores" className="nav-link">Stores</Link>
                        </li>
                    </ul>

                    {isAuthenticated ?
                        <ul className="navbar-nav ml-auto">
                            <li id="user" className="nav-item">
                                <Link to="/add-card" className="nav-link">Sell card</Link>
                            </li>
                            <li id="user" className="nav-item">
                                <Link to="/user" className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <a onClick={this.logout} className="nav-link lgt-btn">Log out</a>
                            </li>
                            <ToastContainer autoClose={3000}/>
                        </ul>
                        :
                        <ul className="navbar-nav ml-auto">
                            <li id="login" className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li id="register" className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    }
                </div>
            </nav >
        );
    }    
}

export default Navbar;