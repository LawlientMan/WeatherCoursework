export const convertTemperature = (unit: string, value: number, toUnit: string): { unit: string; value: number; } => {
    if (unit === "C" && toUnit === "F")
        return { unit: toUnit, value: (value * 1.8 + 32) }

    if (unit === "F" && toUnit === "C")
        return { unit: toUnit, value: ((value - 32) / 1.8) }

    return { unit, value };
}