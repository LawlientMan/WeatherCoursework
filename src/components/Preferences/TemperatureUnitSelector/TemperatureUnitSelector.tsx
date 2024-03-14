import { preferencesSlice } from '@/features/preferences/preferencesSlice';
import store, { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

enum Units {
    C = "C",
    F = "F"
}

const TemperatureUnitSelector = () => {
    const unit = useSelector((state: IRootState) => state.preferences.temperatureUnit);

    const setUnit = (value: Units) => {
        store.dispatch(preferencesSlice.actions.setTemperatureUnit(value))
    }

    return (
        <div className='mb-3'>
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

        </div>
    )
}

export default TemperatureUnitSelector