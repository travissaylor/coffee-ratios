import React, { useContext } from 'react';
import { CalcClasses } from './calculations/QuantityCalc';

export const QuantityContext = React.createContext({
    grounds: 0,
    water: 0,
    brewedCoffee: 0,
    ratio: 16,
    groundsUnit: 'g',
    waterUnit: 'g',
    brewedCoffeeUnit: 'g',
    locked: 'ratio'
});

class QuantityContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            grounds: 0,
            water: 0,
            brewedCoffee: 0,
            ratio: 16,
            groundsUnit: 'g',
            waterUnit: 'g',
            brewedCoffeeUnit: 'g',
            locked: 'ratio',
            loading: true,
        }

        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
        this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this);
        this.decrementQuantityHandler = this.decrementQuantityHandler.bind(this);
        this.lockedQuantityHandler = this.lockedQuantityHandler.bind(this);
        this.unitChangeHandler = this.unitChangeHandler.bind(this);
        this.setStateObject = this.setStateObject.bind(this);
    }

    componentDidMount() {
        if(!this.props.defaultState) {
            this.setState({
                loading: false
            });
            return;
        }

        this.setState((prevState) => ({
            ...prevState,
            ...this.props.defaultState,
            loading: false
        }))
    }

    getFilteredQuantity(newQuantity) {
        newQuantity = parseFloat(+newQuantity);

        if(isNaN(newQuantity) || !newQuantity || newQuantity <= 0) {
            return false;
        }

        return newQuantity;
    }

    setStateObject(newState) {
        this.setState((prevState) => ({
            ...prevState,
            ...newState
        }));
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

    unitChangeHandler(element) {
        this.setState((prevState) => ({
            ...prevState,
            [element]: prevState[element] === 'g' ? 'oz' : 'g'
        }))
    }

    lockedQuantityHandler(element) {
        this.setState({
            locked: element
        });
    }

    render() {
        return (
            <QuantityContext.Provider value={{ratio: this.state.ratio, grounds: this.state.grounds, water: this.state.water, brewedCoffee: this.state.brewedCoffee, groundsUnit: this.state.groundsUnit, waterUnit: this.state.waterUnit, brewedCoffeeUnit: this.state.brewedCoffeeUnit, locked: this.state.locked, fullState: this.state, incrementQuantityHandler: this.incrementQuantityHandler, decrementQuantityHandler: this.decrementQuantityHandler, quantityChangeHandler: this.quantityChangeHandler, unitChangeHandler: this.unitChangeHandler, lockedQuantityHandler: this.lockedQuantityHandler, setStateObject: this.setStateObject}} >
                {this.props.children}
            </QuantityContext.Provider>
        )
    }
}

export default QuantityContextProvider;