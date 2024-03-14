import { preferencesSlice } from '@/features/preferences/preferencesSlice';
import store, { IRootState } from '@/store';
import { useState } from 'react'
import { Form, Nav, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';

enum Units {
    C = "C",
    F = "F"
}

const PreferencesSelector = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const unit = useSelector((state: IRootState) => state.preferences.temperatureUnit);
    const setUnit = (value: Units) => {
        store.dispatch(preferencesSlice.actions.setTemperatureUnit(value))
    }

    return (
        <>
            <Nav.Link onClick={handleShow}>Preferences</Nav.Link>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Preferences</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Temperature Units:</p>
                    <Form>
                        <Form.Check
                            className='mb-2'
                            type='radio'
                            label='Celsius (C)'
                            id='temperature-C'
                            name="group1"
                            onChange={() => setUnit(Units.C)}
                            checked={unit === Units.C}
                        />

                        <Form.Check
                            type='radio'
                            label='Fahrenheit (F)'
                            id='temperature-F'
                            name="group1"
                            onChange={() => setUnit(Units.F)}
                            checked={unit === Units.F}
                        />
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default PreferencesSelector