import { IRootState } from '@/config/store';
import { convertTemperature } from '@/shared/Utils/temperatureConverter';
import { useSelector } from 'react-redux';

interface InputProps {
    unit: string;
    value: number;
}

const Temperature = ({ unit, value }: InputProps) => {
    const userPreferedUnit = useSelector((state: IRootState) => state.preferences.temperatureUnit);
    const result = convertTemperature(unit, value, userPreferedUnit );

    return (
        <>{Math.round(result.value)}{result.unit}</>
    )
}

export default Temperature;