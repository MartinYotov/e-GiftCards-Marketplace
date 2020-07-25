import React, {Component} from "react";
import axios from 'axios';
import './UserProfile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            username: ' ',
            firstName: '',
            lastName: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:3030/api/user/' + localStorage.getItem('egc-username'), {headers: {Authorization: token}})
            .then((response) => {
                console.log(response.data);
                let user = response.data;
                this.setState({
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const token = localStorage.getItem('token');
        axios.put('http://localhost:3030/api/user/edit', this.state, {headers: {Authorization: token}})
            .then((response) => {
                toast.success(response.data.result.message);
            })
            .catch((error) => {
                console.log(error);
                //toast.error(error.response.data.error.message);
            });
        event.preventDefault();
    }


    render() {
        return (         
            <div className="profile-form-wrapper">
                <form className="form-signup" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        readOnly={true}
                        className="form-control"
                        placeholder="Email address"/>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        readOnly={true}
                        className="form-control"
                        placeholder="Username"/>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        className="form-control"
                        placeholder="First Name"
                        onChange={this.handleInputChange}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        value={this.state.lastName}
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={this.handleInputChange}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Update Profile</button>
                    <ToastContainer autoClose={3000}/>
                </form>
            </div>
        )
    }
}

export default UserProfile;