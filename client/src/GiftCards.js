import React, { Component } from 'react';
import './GiftCards.css';
import axios from 'axios';
import GiftCardsTable from './GiftCardsTable.js';

class GiftCards extends Component {

    constructor(props) {
        super(props);

        this.serverBaseUrl = 'http://localhost:3030/api/'; 
        this.giftCardsTable = React.createRef();

        this.state = {
            giftCards: [],
            giftCardsByStore: [],
            filteredGiftCards: [],
            stores: [],
            selectedStore: 'Аll',
            filters: {
                price: { min: 0, max: 999 },
                discount: { min: 0, max: 100 },
                buyPrice: { min: 0, max: 999 }
            }
        };
        
    }

    componentWillMount() {
        axios.all([
            axios.get(this.serverBaseUrl + 'gift-card'),
            axios.get(this.serverBaseUrl + 'store/names')
        ])
        .then(responses => {            
            this.setState({
                giftCards: responses[0].data,
                giftCardsByStore: responses[0].data,
                filteredGiftCards: responses[0].data,
                stores: responses[1].data
            });             
        })
        .catch(err => {
            console.error(err.response);
        });
    }

    handleStoreChange = (event) => {
        const storeId = event.target.value;

        if (storeId === 'All') {
            this.setState({
                giftCardsByStore: this.state.giftCards,
                selectedStore: 'All'
            }, this.giftCardsTable.current.updateFiltered(this.state.giftCards));
        } else {
            axios.get(this.serverBaseUrl + 'store/' + storeId)
                .then(response =>{                        
                    this.setState({
                        giftCardsByStore: response.data.giftCards,
                        selectedStore: response.data
                    }, this.giftCardsTable.current.updateFiltered(response.data.giftCards));
                })
                .catch(err => {
                    console.err(err.response);
                });
        }
    }

    render() {
        return (
            <div>
                {this.state.giftCards ?
                    <div>
                        <p id="title">Gift Cards</p>
                        <GiftCardsTable ref={this.giftCardsTable}
                            handleStoreChange={this.handleStoreChange}
                            stores={this.state.stores}
                            filteredGiftCards={this.state.filteredGiftCards}
                            giftCardsByStore={this.state.giftCardsByStore}
                            selectedStore={this.state.selectedStore}>
                        </GiftCardsTable>
                    </div>
                    :
                    <div>Loading</div>
                }
            </div>
        );
    }
}

export default GiftCards;