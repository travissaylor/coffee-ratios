import React, {useContext} from 'react';

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
            ratio: 16
        }

        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
        this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this);
        this.decrementQuantityHandler = this.decrementQuantityHandler.bind(this);
    }

    quantityChangeHandler(element, newQuantity) {
        newQuantity = parseFloat(+newQuantity);

        if(isNaN(newQuantity) || !newQuantity || newQuantity <= 0) {
            this.setState((prevState) => ({
                grounds: 0,
                water: 0,
                brewedCoffee: 0,
                ratio: 16
            }));
            return;
        }

        if(element == 'ratio') {
            this.setState((prevState) => ({
                ratio: newQuantity,
                grounds: prevState.ratio/newQuantity*prevState.grounds,
                water: prevState.ratio/newQuantity*prevState.water,
                brewedCoffee: prevState.ratio/newQuantity*prevState.brewedCoffee
            }));
        } else if(element == 'grounds') {
            this.setState((prevState) => ({
                ...prevState,
                grounds: newQuantity,
                water: newQuantity*this.props.ratio,
                brewedCoffee: newQuantity*this.props.ratio - 2*newQuantity
            }));
        } else if(element == 'water') {
            this.setState((prevState) => ({
                ...prevState,
                grounds: newQuantity/this.props.ratio,
                water: newQuantity,
                brewedCoffee: newQuantity - 2*(newQuantity/this.props.ratio)
            }));
        } else if(element == 'brewedCoffee') {
            this.setState((prevState) => ({
                ...prevState,
                grounds: newQuantity / (this.props.ratio - 2 ),
                water: (2*this.props.ratio*newQuantity)/(2*this.props.ratio - 2),
                brewedCoffee: newQuantity
            }));
        }
    }

    incrementQuantityHandler(element, amount) {
        this.quantityChangeHandler(element, this.state[element] + amount);
        // this.setState((prevState) => ({...prevState, [element]: prevState[element] + amount}))
    }

    decrementQuantityHandler(element, amount) {
        this.quantityChangeHandler(element, this.state[element] - amount);
        // this.setState((prevState) => ({...prevState, [element]: (prevState[element] - amount > 0) ? prevState[element] - amount : 0}))
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