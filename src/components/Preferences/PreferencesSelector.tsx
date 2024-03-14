import FavoriteIconSelector from '@/components/Preferences/FavoriteIconSelector/FavoriteIconSelector';
import TemperatureUnitSelector from '@/components/Preferences/TemperatureUnitSelector/TemperatureUnitSelector';
import { useState } from 'react'
import { Nav, Offcanvas } from 'react-bootstrap';

const PreferencesSelector = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link onClick={handleShow}>Preferences</Nav.Link>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Preferences</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <TemperatureUnitSelector />
                    <FavoriteIconSelector />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default PreferencesSelector