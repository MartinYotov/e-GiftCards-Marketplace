import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './AddGiftCard.css';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddGiftCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            selectedStore: '',
            newCard: {
                store: '',
                cardValue: '',
                price: '',
                discountPercentage: 0,
                code: ''
            },
            redirect: false
        }

        this.percentMarks = [
            { label: '0%', value: 0 },
            { label: '100%', value: 100 }
        ];

        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3030/api/store/names')
            .then(response => {
                console.log(response.data);
                const newCard = this.state.newCard;
                newCard.store = response.data[0]._id;
                this.setState({
                    stores: response.data,
                    newCard
                });
            })
            .catch(err => {
                console.error(err.response);
            });
    }

    handleStoreChange(e, element){
        const props = element.props;
        const newCard = this.state.newCard;
        newCard.store = props.value;

        this.setState({
            selectedStore: { id: props.value, name: props.label },
            newCard
        });
    }

    handleSliderChange(e, value) {
        const newCard = this.state.newCard;
        newCard.discountPercentage = value;
        newCard.price = newCard.cardValue - (newCard.cardValue * newCard.discountPercentage / 100);

        this.setState({
            newCard
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const newCard = this.state.newCard;
        newCard[name] = value;
        if (name === 'cardValue') {
            newCard.price = value - (value * newCard.discountPercentage / 100);
        }

        this.setState({
            newCard
        });
    }

    handleSubmit(event) {
        const newCard = this.state.newCard;
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3030/api/gift-card', newCard, {headers: {Authorization: token}})
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
            <div>
                <p id="title">Gift Cards</p>
                <div className="add-card-form-wrapper">
                    <form className="form-add-card" onSubmit={this.handleSubmit}>
                        <label htmlFor="store">Store</label>
                        <div>
                            <Select
                                name="store"
                                label={this.state.selectedStore.name || 
                                    (this.state.stores[0] ? this.state.stores[0].name  : '')}
                                value={this.state.selectedStore.id || 
                                    (this.state.stores[0] ? this.state.stores[0]._id : '')}
                                onChange={this.handleStoreChange}
                            >
                                {this.state.stores.map(store => (
                                    <MenuItem key={store._id} name={store.name} value={store._id}>{store.name}</MenuItem>
                                ))}
                            </Select>
                        </div>

                        <label htmlFor="cardValue">Card Value in $</label>                        
                        <input
                            type="number"
                            name="cardValue"
                            className="form-control"
                            placeholder="Card Value"
                            min="0"
                            onChange={this.handleInputChange}/>

                        <label htmlFor="discount">Discount %</label>
                        <div className="discount">                      
                            <Slider 
                                name="discount"
                                defaultValue={0} 
                                marks={this.percentMarks} 
                                valueLabelDisplay={'on'}
                                disabled={!this.state.newCard.cardValue}
                                valueLabelFormat={value => value + '%'}
                                onChange={this.handleSliderChange}>
                            </Slider>
                        </div> 

                        <label htmlFor="sell-price">Sell price</label>
                        <div className="buy-price">
                            ${this.state.newCard.price}
                        </div>

                        <label htmlFor="code">Card code (will be revealed when buyer pays)</label>                        
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            placeholder="Card Code"
                            minLength="10"
                            onChange={this.handleInputChange}/>


                        <button disabled={!this.state.newCard.cardValue} className="btn btn-lg btn-primary btn-block" type="submit">Add Card</button>
                        <ToastContainer autoClose={3000}/>

                    </form>
                </div>
            </div>
        );
    }
}

export default AddGiftCard;