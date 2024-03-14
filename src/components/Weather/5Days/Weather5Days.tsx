import Weather5DaysSkeleton from '@/components/Weather/5Days/Weather5DaysSkeleton';
import Temperature from '@/components/Weather/common/Temperature';
import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { useGet5DaysWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import { formatInTimeZone } from 'date-fns-tz';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Weather5Days = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGet5DaysWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    if(!selectedLocation) return;
    if (isFetching) return <Weather5DaysSkeleton/>;
    if (error || !data) return <Alert variant='danger'> Something went wrong. </Alert>;

    return (
        <>
            {data.DailyForecasts.map((record) => (
                <Col key={record.Date} className="mb-3" xs={12} md={6} xxl>
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title>{formatInTimeZone(record.Date, selectedLocation.TimeZone.Name, 'EEEE, LLL do')}</Card.Title>
                            <Card.Subtitle className="text-muted mb-3">
                                <Temperature unit={record.Temperature.Maximum.Unit} value={record.Temperature.Maximum.Value} />
                                {' / '}
                                <Temperature unit={record.Temperature.Minimum.Unit} value={record.Temperature.Minimum.Value} />
                                </Card.Subtitle>
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