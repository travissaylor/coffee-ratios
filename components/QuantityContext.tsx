import React, { useContext } from "react";
import { CalcClasses } from "./calculations/QuantityCalc";
import { Unit, QuantityType, UnitType } from "../types/types";

export interface QuantityContextState {
  grounds: number;
  water: number;
  brewedCoffee: number;
  ratio: number;
  groundsUnit: Unit;
  waterUnit: Unit;
  brewedCoffeeUnit: Unit;
  locked: QuantityType;
}

export interface QuantityContextHandlers {
  incrementQuantityHandler: (element: QuantityType, amount: number) => void;
  decrementQuantityHandler: (element: QuantityType, amount: number) => void;
  quantityChangeHandler: (element: QuantityType, newValue: string) => void;
  unitChangeHandler: (element: UnitType) => void;
  lockedQuantityHandler: (element: QuantityType) => void;
  setStateObject: (newState: Partial<QuantityContextState>) => void;
}

type QunatityContextSH = QuantityContextHandlers & QuantityContextState;

export interface QunatityContextCombined extends QunatityContextSH {
  fullState: QuantityContextState;
}

interface ProviderProps {
  defaultState?: QuantityContextState;
  children: React.ReactNode;
}

export const QuantityContext = React.createContext<
  Partial<QunatityContextCombined>
>({
  grounds: 0,
  water: 0,
  brewedCoffee: 0,
  ratio: 16,
  groundsUnit: "g",
  waterUnit: "g",
  brewedCoffeeUnit: "g",
  locked: "ratio",
});

class QuantityContextProvider extends React.Component<
  ProviderProps,
  QuantityContextState
> {
  constructor(props: ProviderProps) {
    super(props);

    this.state = {
      grounds: 0,
      water: 0,
      brewedCoffee: 0,
      ratio: 16,
      groundsUnit: "g",
      waterUnit: "g",
      brewedCoffeeUnit: "g",
      locked: "ratio",
    };

    this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
    this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this);
    this.decrementQuantityHandler = this.decrementQuantityHandler.bind(this);
    this.lockedQuantityHandler = this.lockedQuantityHandler.bind(this);
    this.unitChangeHandler = this.unitChangeHandler.bind(this);
    this.setStateObject = this.setStateObject.bind(this);
  }

  componentDidMount() {
    if (!this.props.defaultState) {
      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      ...this.props.defaultState,
    }));
  }

  getFilteredQuantity(newQuantity: string): number | null {
    const quantityNumber = parseFloat(newQuantity);

    if (isNaN(quantityNumber) || !newQuantity || quantityNumber <= 0) {
      return null;
    }

    return quantityNumber;
  }

  setStateObject(newState: Partial<QuantityContextState>) {
    this.setState((prevState) => ({
      ...prevState,
      ...newState,
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

  quantityChangeHandler(element: QuantityType, newValue: string) {
    const filteredValue = this.getFilteredQuantity(newValue);

    if (filteredValue === null) {
      this.setDefaultState();
      return;
    }

    this.setState((prevState) => {
      const CalcClass = new CalcClasses[element]();
      return {
        ...prevState,
        ...CalcClass[this.state.locked + "Locked"](filteredValue, prevState),
      };
    });
  }

  incrementQuantityHandler(element: QuantityType, amount: number) {
    this.quantityChangeHandler(
      element,
      ((this.state[element] as number) + amount).toString()
    );
  }

  decrementQuantityHandler(element: QuantityType, amount: number) {
    this.quantityChangeHandler(
      element,
      ((this.state[element] as number) - amount).toString()
    );
  }

  unitChangeHandler(element: UnitType) {
    this.setState((prevState) => ({
      ...prevState,
      [element]: prevState[element] === "g" ? "oz" : "g",
    }));
  }

  lockedQuantityHandler(element: QuantityType) {
    this.setState({
      locked: element,
    });
  }

  render() {
    return (
      <QuantityContext.Provider
        value={{
          ratio: this.state.ratio,
          grounds: this.state.grounds,
          water: this.state.water,
          brewedCoffee: this.state.brewedCoffee,
          groundsUnit: this.state.groundsUnit,
          waterUnit: this.state.waterUnit,
          brewedCoffeeUnit: this.state.brewedCoffeeUnit,
          locked: this.state.locked,
          fullState: this.state,
          incrementQuantityHandler: this.incrementQuantityHandler,
          decrementQuantityHandler: this.decrementQuantityHandler,
          quantityChangeHandler: this.quantityChangeHandler,
          unitChangeHandler: this.unitChangeHandler,
          lockedQuantityHandler: this.lockedQuantityHandler,
          setStateObject: this.setStateObject,
        }}
      >
        {this.props.children}
      </QuantityContext.Provider>
    );
  }
}

export default QuantityContextProvider;
