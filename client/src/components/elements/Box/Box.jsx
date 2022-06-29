import React from 'react'
import cx from 'classnames';

const Box = ({ children, className, isError }) => {

    const classNames = cx('box', {
        'box--is-error' : isError
    }, className)

    return (
        <div className={classNames}>
            {children}
        </div>
    )
}

export {Box}