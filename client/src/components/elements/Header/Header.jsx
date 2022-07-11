import React from 'react'
import cx from 'classnames';

const Header = ({ pageName, className, isError }) => {

    const classNames = cx('header', {
        'header--is-error' : isError
    }, className)

    return (
        <h1 className={classNames}>
            Kyndryl Emporium 
            <div>{pageName}</div>
        </h1>
    )
}

export {Header}