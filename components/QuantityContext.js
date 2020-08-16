import React, { useContext } from 'react';
import { CalcClasses } from './calculations/QuantityCalc';

export const QuantityContext = React.createContext({
    grounds: 0,
    water: 0,
    brewedCoffee: 0,
    ratio: 16
});

class QuantityContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grounds: 0,
            water: 0,
            brewedCoffee: 0,
            ratio: 16,
            locked: 'brewedCoffee'
        }

        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
        this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this);
        this.decrementQuantityHandler = this.decrementQuantityHandler.bind(this);
    }

    getFilteredQuantity(newQuantity) {
        newQuantity = parseFloat(+newQuantity);

        if(isNaN(newQuantity) || !newQuantity || newQuantity <= 0) {
            return false;
        }

        return newQuantity;
    }

    setDefaultState() {
        this.setState((prevState) => ({
            ...prevState,
            ratio: 16,
            grounds: 0,
            water: 0,
            brewedCoffee: 0,
        }));
    }

    quantityChangeHandler(element, newValue) {
        newValue = this.getFilteredQuantity(newValue);

        if(newValue === false) {
            this.setDefaultState();
            return;
        }

        this.setState((prevState) => {
            const CalcClass = new CalcClasses[element];
            return {
                ...prevState,
                ...CalcClass[this.state.locked + 'Locked'](newValue, prevState)
            }
        });
    }

    incrementQuantityHandler(element, amount) {
        this.quantityChangeHandler(element, this.state[element] + amount);
    }

    decrementQuantityHandler(element, amount) {
        this.quantityChangeHandler(element, this.state[element] - amount);
    }

    render() {
        return (
            <QuantityContext.Provider value={{ratio: this.state.ratio, grounds: this.state.grounds, water: this.state.water, brewedCoffee: this.state.brewedCoffee, groundsChangeHandler: this.groundsChangeHandler, incrementQuantityHandler: this.incrementQuantityHandler, decrementQuantityHandler: this.decrementQuantityHandler, quantityChangeHandler: this.quantityChangeHandler}} >
                {this.props.children}
            </QuantityContext.Provider>
        )
    }
}

export default QuantityContextProvider;