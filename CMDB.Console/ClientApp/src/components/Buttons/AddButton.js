﻿import React from 'react';
import { Button } from 'reactstrap';

export function AddButton(props) {
    return (
        <Button className="m-3" color="primary" onClick={props.onClick}>
            <svg width="2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-node-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 7.5A1.5 1.5 0 0 1 1.5 6h1A1.5 1.5 0 0 1 4 7.5v1A1.5 1.5 0 0 1 2.5 10h-1A1.5 1.5 0 0 1 0 8.5v-1zM1.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM7 8.5H4v-1h3v1z" />
                <path fill-rule="evenodd" d="M11 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
                <path fill-rule="evenodd" d="M11 5a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 11 5z" />
            </svg>
        </Button>
    );
}