import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Stores.css';

class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            filteredStores: []
        }

        this.filter = this.filter.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3030/api/store')
            .then(response => {
                console.log(response.data);
                this.setState({
                    stores: response.data,
                    filteredStores: response.data
                });
            })
            .catch(err => {
                console.error(err.response);
            });
    }

    filter(event) {
        const filtered = this.state.stores
            .filter(store => store.name
                .toLowerCase()
                .includes(event.target.value)
            );
        this.setState({
            filteredStores: filtered
        });
    }

    render() {
        return (
            <div>
                <p id="title">Browse Stores</p>

                <div className="row justify-content-center">
                    <div className="input-group col-sm-4 " >
                        <input className="form-control" placeholder="Search for a store" onKeyUp={this.filter}/>
                        <span className="input-group-btn">
                            <button className="btn btn-info">Search</button>
                        </span>
                    </div>
                </div>

                <div id="stores-container">
                    {this.state.filteredStores.map(store => (
                        <div key={store.name} className="store">
                            <Link to={{ pathname: `/store/${store._id}` }}>
                                <div className="store-image" style={{ backgroundImage: `url(${"./images/" + store.image})` }} />
                            </Link>
                            {store.name}
                        </div>)
                    )}
                </div>
            </div>
        );
    }
}

export default Stores;