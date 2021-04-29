import React, { Component, useState } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";

export function EquipmentSearch(props) {
    const [hostName, setHostName] = useState("");
    const [serialNumber, setSerialNumber] = useState("");

    const handleClick = (e) => {
        console.log(e, hostName, serialNumber)
        this.context.router.push('/other/route')
    }

    const params = new URLSearchParams({
        hostName: hostName,
        serialNumber: serialNumber
    });

    return (
        <AvForm>
            <ModalHeader>Поиск оборудования</ModalHeader>
            <AvField label="Имя" name="name" bsSize="lg"
                onChange={(e) => setHostName(e.currentTarget.value)} value={hostName} />
            <AvField label="Серийный номер" name="name" bsSize="lg"
                    onChange={(e) => setSerialNumber(e.currentTarget.value)} value={serialNumber} />
            <Link to={"/equipments/list?" + params.toString()} className="btn btn-primary" bsSize="lg">Поиск</Link>
        </AvForm >
    );
}   
