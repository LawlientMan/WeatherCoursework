import WeatherHourlySkeleton from '@/components/Weather/Hourly/WeatherHourlySkeleton';
import Temperature from '@/components/Weather/common/Temperature';
import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { useGetHourlyWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import { formatInTimeZone } from 'date-fns-tz';
import { Alert, Card, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const WeatherHourly = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGetHourlyWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    if (!selectedLocation) return;
    if (isFetching) return <WeatherHourlySkeleton />;
    if (error || !data) return <Col><Alert variant='danger'> Something went wrong. </Alert></Col>;

    return (
        <>
            {data.map((record) => (
                <Col key={record.DateTime} xs={12} sm={6} md={4} lg={3} xxl={2} className="mb-3">
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title>{formatInTimeZone(record.DateTime, selectedLocation.TimeZone.Name, 'LLL do, HH-00')}</Card.Title>
                            <Card.Subtitle className="text-muted">
                                {record.IconPhrase} <Temperature unit={record.Temperature.Unit} value={record.Temperature.Value} />
                            </Card.Subtitle>
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