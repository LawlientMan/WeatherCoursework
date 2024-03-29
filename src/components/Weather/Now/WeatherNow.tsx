import WeatherIcon from '@/components/Weather/components/WeatherIcon';
import { useGetCurrentWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/config/store';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '@/components/Weather/Now/WeatherNow.css'
import WeatherNowSkeleton from '@/components/Weather/Now/WeatherNowSkeleton';
import { formatInTimeZone } from 'date-fns-tz';
import Temperature from '@/components/Weather/components/Temperature';

const WeatherNow = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGetCurrentWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    if (!selectedLocation) return;
    if (isFetching) return <WeatherNowSkeleton />;
    if (error || !data) return <Col><Alert variant='danger'> Something went wrong. </Alert></Col>;

    return (
        <>
            <Col xl={4} md={6} xs={12} >
                <Card>
                    <Card.Body>
                        <Card.Title>Current weather</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{formatInTimeZone(data.LocalObservationDateTime, selectedLocation.TimeZone.Name, 'EEEE, LLL do HH:mm')}</Card.Subtitle>
                        <Row className='forecast-container'>
                            <Col className='weather-icon-container'>
                                <WeatherIcon className='weather-icon' imageIndex={data.WeatherIcon} />
                            </Col>
                            <Col className='weather-conditions text-center my-auto'>
                                <div className='weather-text'> {data.WeatherText}</div>
                                <div className='weather-temperature'>
                                    <Temperature unit={data.Temperature.Metric.Unit} value={data.Temperature.Metric.Value} />
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            {/* TODO delete */}
            {/* <div><pre>{JSON.stringify(data, null, 2)}</pre></div> */}
        </>
    )
}

export default WeatherNow