import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import './GiftCards.css';

class GiftCards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            giftCards: []            
        };        
    }

    componentWillMount() {
        axios.get('http://localhost:3030/api/best-deals')
            .then(response => {            
            this.setState({
                giftCards: response.data
            });             
        })
        .catch(err => {
            console.error(err.response);
        });
    }

    render() {
        return (
            <div>
                {this.state.giftCards ?
                    <div>
                        <p id="title">Our Best Deals</p>
                        <table>
                            <thead className="header-row">
                                <tr className="titles-header">
                                    <td className="header-store"><span>Store</span></td>
                                    <td className="header-value"><span>Card value</span></td>
                                    <td className="header-off"><span>% off</span></td>
                                    <td className="header-price"><span>Price to buy</span></td>
                                    <td className="header-buy"><span></span></td> 
                                </tr>                                            
                            </thead>
                            <tbody>
                                {this.state.giftCards.map(giftCard => (
                                    <tr key={giftCard._id} card-id={giftCard._id} className="gift-card-row">
                                        <td>
                                            <Link to={{ pathname: `/cards/${giftCard._id}` }}>
                                                <img
                                                    alt={ giftCard.store ? giftCard.store.name : this.props.selectedStore.name }
                                                    src={ "../images/" + (giftCard.store ? giftCard.store.image : this.props.selectedStore.image) } 
                                                />
                                            </Link>
                                         </td>
                                         <td>${giftCard.cardValue}</td>
                                         <td>{giftCard.discountPercentage}%</td>
                                         <td>${giftCard.price}</td>
                                         <td>
                                            <Link to={{ pathname: `/cards/${giftCard._id}` }}>
                                                <button type="button" className="btn btn-primary">Buy Now</button>
                                            </Link>
                                        </td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>    
                    </div>
                    :
                    <div>Loading</div>
                }
            </div>
        );
    }
}

export default GiftCards;