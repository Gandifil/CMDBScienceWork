import React from 'react';
import { useFetch } from "react-async"
import ReactLoading from 'react-loading';

export function LoadingData(props) {
    const { data, error, isPending } = useFetch(props.resource, {
        headers: { accept: "application/json" },
    })
    if (isPending) return <ReactLoading type="cylon" color="black" className="m-auto" height={'30%'} width={'30%'} />
    if (error) return `Something went wrong: ${error.message}`
    if (data)
        return props.render(data)
    return null
}