import React from 'react'
import {Box} from '../../index'

const placeholderValue = '__PLACEHOLDER__'

const Select = ({name, onChange, value, options, key, placeholder}) => {
    return (
        <Box>
            <select 
            name={name} 
            onChange={(e) => {
                const { value: option } = e.target
                return onChange && onChange(option)
            }} 
            value={value || placeholderValue}>
                {placeholder && (
                    <option value={placeholderValue}>{placeholder}</option>
                )}
                {options.map((option) => {
                return <option key={key} value={option}>{option}</option>
            })}
            </select>
        </Box>
    )
}

export {Select}