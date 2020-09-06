import { Button } from 'react-native';
import React, { useContext } from 'react';
import { QuantityContext } from './QuantityContext';

const Reset = (props) => {

    const qantityctx = useContext(QuantityContext);

    const handleReset = () => {
        qantityctx.setDefaultState();
    }

    return (
        <Button {...props} onPress={handleReset} />
    )
}

export default Reset;