export class RatioCalcClass {
    ratioLocked(newRatio, prevState) {
        return {
            ratio: newRatio,
            grounds: prevState.ratio / newRatio * prevState.grounds,
            water: prevState.ratio / newRatio * prevState.water,
            brewedCoffee: prevState.ratio / newRatio * prevState.brewedCoffee
        }
    }

    groundsLocked(newRatio, prevState) {
        const newWater = newRatio * prevState.grounds
        return {
            ratio: newRatio,
            grounds: prevState.grounds,
            water: newWater,
            brewedCoffee: newWater - 2 * prevState.grounds
        }
    }

    waterLocked(newRatio, prevState){
        return {
            ratio: newRatio,
            grounds: prevState.water / newRatio,
            water: prevState.water,
            brewedCoffee: prevState.water - 2 * (prevState.water / newRatio)
        }
    }

    brewedCoffeeLocked(newRatio, prevState) {
        return {
            ratio: newRatio,
            grounds: prevState.brewedCoffee / (newRatio - 2),
            water: (newRatio * prevState.brewedCoffee) / (newRatio - 1),
            brewedCoffee: prevState.brewedCoffee
        }
    }
}

export class GroundsCalcClass {
    ratioLocked(newGrounds, prevState) {
        return {
            ratio: prevState.ratio,
            grounds: newGrounds,
            water: prevState.ratio * newGrounds,
            brewedCoffee: newGrounds * (prevState.ratio - 2)
        }
    }

    groundsLocked(newGrounds, prevState) {
        return {
            ratio: prevState.ratio,
            grounds: newGrounds,
            water: prevState.ratio * newGrounds,
            brewedCoffee: newGrounds * (prevState.ratio - 2)
        }
    }

    waterLocked(newGrounds, prevState){
        return {
            ratio: prevState.water / newGrounds,
            grounds: newGrounds,
            water: prevState.water,
            brewedCoffee: prevState.water - 2 * newGrounds
        }
    }

    brewedCoffeeLocked(newGrounds, prevState) {
        return {
            ratio: prevState.brewedCoffee / newGrounds + 2,
            grounds: newGrounds,
            water: 2 * newGrounds + prevState.brewedCoffee,
            brewedCoffee: prevState.brewedCoffee
        }
    }
}

export class WaterCalcClass {
    ratioLocked(newWater, prevState) {
        return {
            ratio: prevState.ratio,
            grounds: newWater / prevState.ratio,
            water: newWater,
            brewedCoffee: newWater - 2 * (newWater / prevState.ratio)
        }
    }

    groundsLocked(newWater, prevState) {
        return {
            ratio: newWater / prevState.grounds,
            grounds: prevState.grounds,
            water: newWater,
            brewedCoffee: newWater - 2 * prevState.grounds
        }
    }

    waterLocked(newWater, prevState){
        return {
            ratio: prevState.ratio,
            grounds: newWater / prevState.ratio,
            water: newWater,
            brewedCoffee: newWater - 2 * (newWater / prevState.ratio)
        }
    }

    brewedCoffeeLocked(newWater, prevState) {
        return {
            ratio: newWater / prevState.grounds,
            grounds: prevState.grounds,
            water: newWater,
            brewedCoffee: prevState.brewedCoffee
        }
    }
}

export class BrewCalcClass {
    ratioLocked(newBrew, prevState) {
        return {
            ratio: prevState.ratio,
            grounds: newBrew / (prevState.ratio - 2),
            water: (prevState.ratio * newBrew) / (prevState.ratio - 1),
            brewedCoffee: newBrew
        }
    }

    groundsLocked(newBrew, prevState) {
        return {
            ratio: newBrew / prevState.grounds + 2,
            grounds: prevState.grounds,
            water: 2 * prevState.grounds + newBrew,
            brewedCoffee: newBrew
        }
    }

    waterLocked(newBrew, prevState){
        return {
            ratio: 2 * prevState.water / (prevState.water - newBrew),
            grounds: (prevState.water - newBrew) / 2,
            water: prevState.water,
            brewedCoffee: newBrew
        }
    }

    brewedCoffeeLocked(newBrew, prevState) {
        return {
            ratio: prevState.ratio,
            grounds: newBrew / (prevState.ratio - 2),
            water: (prevState.ratio * newBrew) / (prevState.ratio - 1),
            brewedCoffee: newBrew
        }
    }
}

export const CalcClasses = {
    ratio: RatioCalcClass,
    grounds: GroundsCalcClass,
    water: WaterCalcClass,
    brewedCoffee: BrewCalcClass
}