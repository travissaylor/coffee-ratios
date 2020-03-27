import React from 'react';

export const RatioContext = React.createContext({
    ratio: 16
})

class RatioContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ratio: 16
        }
        this.ratioChangeHandler = this.ratioChangeHandler.bind(this);
        this.incrementRatio = this.incrementRatio.bind(this);
        this.decrementRatio = this.decrementRatio.bind(this);
    }

    ratioChangeHandler(newRatio) {
        newRatio = parseInt(newRatio);

        if(isNaN(newRatio) || !newRatio || newRatio <= 0) {
            this.setState({ratio: 0});
            return;
        }
        this.setState({ratio: newRatio});
    }

    incrementRatio() {
        this.setState((prevState) => (
            {ratio: prevState.ratio + 1}
        ));
    }

    decrementRatio() {
        this.setState((prevState) => (
            {ratio: prevState.ratio - 1}
        ));
    }

    render() {
        return (
            <RatioContext.Provider value={{ratio: this.state.ratio, ratioChangeHandler: this.ratioChangeHandler, incrementRatio: this.incrementRatio, decrementRatio: this.decrementRatio}}>
                {this.props.children}
            </RatioContext.Provider>
        )
    }
}

export default RatioContextProvider;