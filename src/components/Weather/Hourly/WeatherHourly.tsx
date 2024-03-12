import WeatherHourlySkeleton from '@/components/Weather/Hourly/WeatherHourlySkeleton';
import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { useGetHourlyWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import { Alert, Card, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const WeatherHourly = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGetHourlyWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    if (isFetching) return <WeatherHourlySkeleton/>;

    if (error || !data) return <Alert variant='danger'> Something went wrong. </Alert>;

    return (
        <>
            {data.map((record) => (
                <Col key={record.DateTime} xs={12} sm={6} md={3} xxl={2} className="mb-3">
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title>{record.DateTime}</Card.Title>
                            <Card.Subtitle className="text-muted">{record.IconPhrase} {record.Temperature.Value}{record.Temperature.Unit}</Card.Subtitle>
                            <Card.Text>{record.HasPrecipitation
                                ? (record.PrecipitationIntensity + ' ' + record.PrecipitationType + ' ' + record.PrecipitationProbability + '%')
                                : ('No precipitation')}</Card.Text>
                        </Card.Body>
                        <WeatherIcon className='weather-icon card-img-bottom' imageIndex={record.WeatherIcon} />
                    </Card>
                </Col>
            ))}

            {/* todo delete <div><pre>{JSON.stringify(data, null, 2)}</pre></div> */}
        </>
    )
}

export default WeatherHourly