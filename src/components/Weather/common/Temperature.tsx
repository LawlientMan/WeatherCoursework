import { IRootState } from '@/config/store';
import { useSelector } from 'react-redux';

interface InputProps {
    unit: string;
    value: number;
}

const convertTemperature = (unit: string, value: number, toUnit: string): { unit: string; value: number; } => {
    if (unit === "C" && toUnit === "F")
        return { unit: toUnit, value: (value * 1.8 + 32) }

    if (unit === "F" && toUnit === "C")
        return { unit: toUnit, value: ((value - 32) / 1.8) }

    return { unit, value };
}

const Temperature = ({ unit, value }: InputProps) => {
    const userPreferedUnit = useSelector((state: IRootState) => state.preferences.temperatureUnit);
    const result = convertTemperature(unit, value, userPreferedUnit );

    return (
        <>{Math.round(result.value)}{result.unit}</>
    )
}

export default Temperature;