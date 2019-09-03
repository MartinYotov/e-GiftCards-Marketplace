import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount(){
        const path = window.location.pathname.split('/')[1];
        this.updateActiveLi(document.getElementById(path));
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

    render() {
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

                    {this.state.isAuthenticated ?
                        <ul className="navbar-nav ml-auto">
                            <li id="user" className="nav-item">
                                <Link to="/user" className="nav-link">Profile</Link>
                            </li>
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