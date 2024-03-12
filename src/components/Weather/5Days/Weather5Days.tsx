import Weather5DaysSkeleton from '@/components/Weather/5Days/Weather5DaysSkeleton';
import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { useGet5DaysWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Weather5Days = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGet5DaysWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    if (isFetching) return <Weather5DaysSkeleton/>;
    if (error || !data) return <Alert variant='danger'> Something went wrong. </Alert>;

    return (
        <>
            <div>Weather5Days</div>
            {data.DailyForecasts.map((record) => (
                <Col key={record.Date} className="mb-3" xs={12} md={6} xxl>
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title>{record.Date}</Card.Title>
                            <Card.Subtitle className="text-muted mb-3">{record.Temperature.Maximum.Value}{record.Temperature.Maximum.Unit} / {record.Temperature.Minimum.Value}{record.Temperature.Minimum.Unit}</Card.Subtitle>
                            <Row>
                                <Col>
                                    <div className='text-center mb-2'><b>Day</b></div>
                                    <WeatherIcon className='weather-icon px-1' imageIndex={record.Day.Icon} />
                                    <div className='text-center'>{record.Day.IconPhrase}</div>
                                </Col>
                                <Col>
                                    <div className='text-center mb-2'><b>Night</b></div>
                                    <WeatherIcon className='weather-icon px-1' imageIndex={record.Night.Icon} />
                                    <div className='text-center'>{record.Night.IconPhrase}</div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            {/* todo delete <div><pre>{JSON.stringify(data, null, 2)}</pre></div> */}
        </>
    )
}

export default Weather5Days