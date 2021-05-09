import React from 'react';
import ReactLoading from 'react-loading';

export function Loading(props) {
    if (props.visible)
        return <ReactLoading type="cylon" color="black" className="m-auto" height={'30%'} width={'30%'} />
    else
        return <div>{ props.children }</div>
}