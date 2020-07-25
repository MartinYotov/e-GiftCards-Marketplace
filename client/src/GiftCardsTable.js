import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';

import './GiftCardsTable.css';

class GiftCardsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                price: { min: 0, max: 999 },
                discount: { min: 0, max: 100 },
                buyPrice: { min: 0, max: 999 }
            },
            filteredGiftCards: this.props.filteredGiftCards
        }

        this.priceMarks = [
            { label: '$0', value: 0 },
            { label: '$999', value: 999 }
        ]
        this.percentMarks = [
            { label: '0%', value: 0 },
            { label: '100%', value: 100 }
        ];
        this.firstLoading = true;
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.firstLoading) {
            this.firstLoading = false;
            this.setState({ filteredGiftCards: nextProps.filteredGiftCards });
        }
    }

    filterByDiscount = (event, value) => {     
       const newFilters = this.state.filters;
       newFilters.discount = { min: value[0], max: value[1] };

       this.setState({ filters: newFilters }, this.updateFiltered);
    }

    filterByPrice = (event, value) => {     
        const newFilters = this.state.filters;
        newFilters.price = { min: value[0], max: value[1] };

        this.setState({ filters: newFilters }, this.updateFiltered);
     }

    filterByBuyPrice = (event, value) => {     
        const newFilters = this.state.filters;
        newFilters.buyPrice = { min: value[0], max: value[1] };

        this.setState({ filters: newFilters }, this.updateFiltered);
    }

    updateFiltered = (giftCardsByStore) => {
        const filters = this.state.filters;
        const [price, discount, buyPrice] = [filters.price, filters.discount, filters.buyPrice];

        const filtered = (giftCardsByStore || this.props.giftCardsByStore)
            .filter(card => card.cardValue >= price.min && card.cardValue <= price.max)
            .filter(card => card.discountPercentage >= discount.min && card.discountPercentage <= discount.max)
            .filter(card => card.price >= buyPrice.min && card.price <= buyPrice.max);

        this.setState({
            filteredGiftCards: filtered
        });
    }

    render() {
        return (
            <table>
                <thead className="header-row">
                    <tr className="titles-header">
                        <td className="header-store"><span>Store</span></td>
                        <td className="header-value"><span>Card value</span></td>
                        <td className="header-off"><span>% off</span></td>
                        <td className="header-price"><span>Price to buy</span></td>
                        <td className="header-buy"><span></span></td> 
                    </tr>
                    <tr>
                        <td className="store-select">
                            { !this.props.fixedStore ?
                            <Select
                              defaultValue={'All'}
                              label={this.props.selectedStore.name || 'All'}
                              value={this.props.selectedStore._id || 'All'}
                              onChange={this.props.handleStoreChange}
                            >
                            <MenuItem value={'All'}>All</MenuItem>
                            {this.props.stores.map(store => (
                                <MenuItem key={store._id} label={store.name} value={store._id}>{store.name}</MenuItem>
                            ))}
                            </Select>
                            :
                            <p>{this.props.selectedStore.name}</p> 
                            }
                        </td>
                        <td className="header-value">
                            <Slider 
                                defaultValue={[0, 999]} 
                                marks={this.priceMarks} 
                                valueLabelDisplay={'on'}
                                valueLabelFormat={value => '$' + value}
                                max={999}
                                onChange={this.filterByPrice}>
                            </Slider>
                        </td>
                        <td className="header-off">
                            <Slider 
                                defaultValue={[0, 100]} 
                                marks={this.percentMarks} 
                                valueLabelDisplay={'on'}
                                valueLabelFormat={value => value + "%"}
                                onChange={this.filterByDiscount}>
                            </Slider>
                        </td>
                        <td className="header-price">
                            <Slider 
                                defaultValue={[0, 999]} 
                                marks={this.priceMarks} 
                                valueLabelDisplay={'on'}
                                valueLabelFormat={value => '$' + value}
                                max={999}
                                onChange={this.filterByBuyPrice}>
                            </Slider>
                        </td>
                        <td className="header-buy"><span></span></td> 
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredGiftCards.map(giftCard => (
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
        )
    }
}

export default GiftCardsTable;