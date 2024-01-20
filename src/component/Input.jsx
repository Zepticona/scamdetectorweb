import React from 'react';
import handleChange from '../utils/handleChange';

const Input = ({label,type,name,currentValue,value,setValue}) => {
    return (
        <div>
            <label> {label} : </label>
            <input
                type= {type ? type : 'text'}
                name={name}
                value={currentValue}
                onChange={(e)=>handleChange(e,value,setValue)}
                className='w-full p-2 border focus:outline-none rounded'
            />
        </div>
    );
};

export default Input;