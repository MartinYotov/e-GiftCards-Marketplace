import React, { Component } from 'react';
import axios from 'axios';
import GiftCardsTable from './GiftCardsTable.js';

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

                            <GiftCardsTable 
                                fixedStore={true}
                                filteredGiftCards={this.state.store.giftCards}
                                giftCardsByStore={this.state.store.giftCards}
                                selectedStore={{ name: this.state.store.name, image: this.state.store.image}}>
                            </GiftCardsTable>         
                            :
                            <div className="no-cards">No available gift cards for <span>{this.state.store.name}</span> at the moment. Please, check later.</div>
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