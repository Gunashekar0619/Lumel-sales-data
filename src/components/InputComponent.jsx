import React from 'react';

const InputComponent = ({onChange, ...rest}) => {    
    return (
        <>
            <input type='number' onChange={onChange} {...rest} />
        </>
    )
}

export default InputComponent;