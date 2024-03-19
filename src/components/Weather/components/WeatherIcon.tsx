import React, { SyntheticEvent } from 'react'

type A = React.InputHTMLAttributes<HTMLImageElement>;
interface InputProps extends Omit<A, 'img'> {
    imageIndex: number | null | undefined;
}

const WeatherIcon = (props: InputProps) => {
    const { imageIndex, ...rest } = props;

    const deafultImage = '/src/assets/weatherNotFound.png';
    const src = imageIndex
        ? `https://developer.accuweather.com/sites/default/files/${String(imageIndex).padStart(2, '0')}-s.png`
        : deafultImage;

    function onImageError(event: SyntheticEvent<HTMLImageElement, Event>): void {
        event.currentTarget.src = deafultImage;
        event.currentTarget.alt = 'weather icon not found'
    }

    return (
        <img src={src} {...rest} onError={onImageError} />
    )
}

export default WeatherIcon