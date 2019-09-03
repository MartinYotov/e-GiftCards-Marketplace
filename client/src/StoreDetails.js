import React, { Component } from 'react';
import axios from 'axios';
import './StoreDetails.css';

class StoreDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: null,
            id: props.match.params.id
        }
    }

    componentWillMount() {

        axios.get('http://localhost:3030/api/store/' + this.state.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    store: response.data
                });
            })
            .catch(err => {
                console.error(err.response);
            });
    }

    render() {
        return (
            <div>
                {this.state.store ?
                    <div>
                        <p id="title">{this.state.store.name} Gift Cards</p>

                        {this.state.store.giftCards.length > 0 ?
                            <div>
                                <div className="header-row">
                                    <div class="header-store">Store</div>
                                    <div class="header-value">Card value</div>
                                    <div class="header-off">% off</div>
                                    <div class="header-price">Price to buy</div>
                                </div>
                                <div id="gift-cards-container">
                                    {this.state.store.giftCards.map(giftCard => (
                                        <div key={giftCard._id} className="gift-card-row">
                                            <div>
                                                <img alt={this.state.store.name} src={this.state.store.image} />
                                            </div>
                                            <div>${giftCard.cardValue}</div>
                                            <div>{giftCard.discountPercentage}%</div>
                                            <div>${giftCard.price}</div>
                                            <div><button type="button" class="btn btn-primary">Buy Now</button></div>
                                        </div>)
                                    )}
                                </div>
                            </div>
                            :
                            <div class="no-cards">No available gift cards for <span>{this.state.store.name}</span> at the moment. Please, check later.</div>
                        }
                    </div>
                    :
                    <div>Loading</div>
                }
            </div>
        );
    }
}

export default StoreDetails;