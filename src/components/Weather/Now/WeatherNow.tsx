import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { useGetCurrentWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '@/components/Weather/Now/WeatherNow.css'
import WeatherNowSkeleton from '@/components/Weather/Now/WeatherNowSkeleton';

const WeatherNow = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGetCurrentWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    if (isFetching) return <WeatherNowSkeleton />;

    if (error || !data) return <Alert variant='danger'> Something went wrong. </Alert>;

    return (
        <>
            <Col xl={4} md={6} xs={12} >
                <Card>
                    <Card.Body>
                        <Card.Title>Current weather</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{data?.LocalObservationDateTime}</Card.Subtitle>
                        <Row className='forecast-container'>
                            <Col className='weather-icon-container'>
                                <WeatherIcon className='weather-icon' imageIndex={data?.WeatherIcon} />
                            </Col>
                            <Col className='weather-conditions text-center my-auto'>
                                <div className='weather-text'> {data?.WeatherText}</div>
                                <div className='weather-temperature'>{data?.Temperature.Metric.Value} {data?.Temperature.Metric.Unit}</div>
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