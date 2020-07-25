import React, { Component } from 'react';
import axios from 'axios';

import './GiftCardDetails.css';

class GiftCardDetails extends Component {  

    constructor(props) {
        super(props);
        this.state = {
            giftCard: null,
            id: props.match.params.id
        }
    }

    componentWillMount() {

        axios.get('http://localhost:3030/api/gift-card/' + this.state.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    giftCard: response.data
                });
            })
            .catch(err => {
                console.error(err.response);
            });
    }

    render() {
        return (
            <div>
                {this.state.giftCard ?
                    <div>
                        <div className="container details">
                            <h2>{this.state.giftCard.store.name} Gift Card ${this.state.giftCard.price}</h2>
                            <p className="sublabel email-delivery">Code instantly delivered by email</p>

                            <div className="row">
                              <div className="col-6">
                                <img 
                                    alt={ this.state.giftCard.store.name }
                                    src={ "../images/" + this.state.giftCard.store.image } 
                                />
                              </div>
                              <div className="col">
                                <div>Card value: <b>${this.state.giftCard.cardValue}</b></div>
                                <div>Current price: <b>${this.state.giftCard.price}</b></div>
                                <p><b>{this.state.giftCard.discountPercentage}%</b> discount</p>
                                <div>Seller: {this.state.giftCard.user}</div>
                                <br/>
                                <button id="buyButton" className="btn btn-primary">Buy Now</button>
                              </div>
                            </div>
                        </div>
                        <div className="container details">
                            <div className="row">
                                <div className="col-4">
                                    <div className="label">Digital Code</div>
                                    <p className="sublabel">Directly redeem your product.</p> 

                                    <div className="label">Instant email delivery</div>
                                    <p className="sublabel">All cards are instantly delivered by email.</p>
                                </div>
                                <div className="col">
                                    <h3>How to redeem your code</h3>
                                    <p>Please follow these steps to redeem your code:</p>
                                    <ul>
                                        <li>
                                            {'Go to the ' +
                                            this.state.giftCard.store.name[0].toUpperCase() + this.state.giftCard.store.name.slice(1) +
                                            ' website of the country you bought the gift card for.'}
                                        </li>
                                        <li>Select Your Account.</li>
                                        <li>Click Apply a Gift Card to Your Account.</li>
                                        <li>Enter your code and click Apply to Your Balance.</li>
                                    </ul>
                                    <p>And just like that, the credit is added to your account. And now...let’s shop!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>Loading</div>
                }
            </div>
        );
    }
}

export default GiftCardDetails;