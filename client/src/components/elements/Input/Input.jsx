import React from 'react'
import {Box} from '../../index'

const Input = ({name, onChange, value, placeholder, label, type}) => {
    return (
        <Box>
            <label>{label}</label>
            <input
            name={name} 
            onChange={onChange} 
            value={value || placeholder} 
            type={type}
            placeholder={placeholder}
            />
        </Box>
    )
}

export {Input}