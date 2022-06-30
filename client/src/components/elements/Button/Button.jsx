import React from 'react'
import cx from 'classnames';

const Button = ({ text, className, isError, onClick }) => {

    const classNames = cx('button', {
        'button--is-error' : isError
    }, className)

    return (
        <button className={classNames} onClick={onClick}>
            {text}
        </button>
    )
}

export {Button}