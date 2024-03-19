import { preferencesSlice, setTemperatureUnit } from '@/features/preferences/preferencesSlice';
import store, { IRootState } from '@/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { appConfig } from '@/config/appConfig';

const TemperatureUnitSelector = () => {
    const unit = useSelector((state: IRootState) => state.preferences.temperatureUnit);
    const dispatch = useDispatch();

    const setUnit = (value: string) => {
        dispatch(setTemperatureUnit(value))
    }

    return (
        <div className='mb-3'>
            <p>Temperature Units:</p>
            <Form>
                {appConfig.supportedTemperatureUnits.map(i => (
                    <Form.Check
                        key={i.unit}
                        className='mb-2'
                        type='radio'
                        label={`${i.displayName} (${i.unit})`}
                        id={i.unit}
                        name="temperature-group"
                        onChange={() => setUnit(i.unit)}
                        checked={unit === i.unit}
                    />
                ))}
            </Form>
        </div>
    )
}

export default TemperatureUnitSelector