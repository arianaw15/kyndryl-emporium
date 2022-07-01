import React from 'react'
import {Box} from '../../index'
import cx from 'classnames'

const Input = ({className, name, onChange, value, placeholder, label, type, isError, onFocus}) => {
    const classNames = cx('input', {
        'input--is-error' : isError
    }, className)
    return (
        <Box className={classNames}>
            <label>{label}</label>
            <input
            className='input__is-input'
            name={name} 
            onChange={onChange} 
            onFocus={onFocus}
            value={value || placeholder} 
            type={type}
            placeholder={placeholder}
            />
        </Box>
    )
}

export {Input}