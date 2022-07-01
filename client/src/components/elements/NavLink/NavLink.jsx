import React from 'react'
import cx from 'classnames';
import {Link} from "react-router-dom";

const NavLink = ({ linkLabel, className, isError, to }) => {

    const classNames = cx('link', {
        'link--is-error' : isError
    }, className)

    return (
        <Link className={classNames} to={to}>{linkLabel}</Link>
    )
}

export {NavLink}