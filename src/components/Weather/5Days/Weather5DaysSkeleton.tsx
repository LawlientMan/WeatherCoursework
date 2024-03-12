import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { Card, Col, Placeholder, Row } from 'react-bootstrap';

const Weather5DaysSkeleton = () => {
    const array = [...Array(5).keys()];

    return (
        <>
            {array.map((i) => (
                <Col key={i} xs={12} md={6} xxl className="mb-3">
                    <Card className='h-100'>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={7} />
                            </Placeholder>
                            <Placeholder as={Card.Subtitle} className="text-muted mb-3" animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Row} animation="glow">
                                <Col className='text-center'>
                                    <Placeholder className='mb-2' xs={5} />
                                    <WeatherIcon className='weather-icon px-1 w-75' imageIndex={null} />
                                    <Placeholder className='mb-2' xs={7} />
                                </Col>
                                <Col className='text-center'>
                                    <Placeholder className='mb-2' xs={4} />
                                    <WeatherIcon className='weather-icon px-1 w-75' imageIndex={null} />
                                    <Placeholder className='mb-2' xs={7} />
                                </Col>
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    )
}

export default Weather5DaysSkeleton