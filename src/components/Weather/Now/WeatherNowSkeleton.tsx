import WeatherIcon from '@/components/Weather/components/WeatherIcon'
import { Card, Col, Placeholder, Row } from 'react-bootstrap'

const WeatherNowSkeleton = () => {
    return (
        <Col xl={4} md={6} xs={12} >
            <Card>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Subtitle} className="mb-2 text-muted" animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder className='forecast-container' as={Row} animation="glow">
                        <Col className='text-center my-auto'>
                            <WeatherIcon imageIndex={null} style={{ width: '70%' }} />
                        </Col>
                        <Col className='text-center my-auto' style={{ height: '100%' }} >
                            <Placeholder xs={7} />
                            <Placeholder xs={7} />
                            <Placeholder xs={7} />
                        </Col>
                    </Placeholder>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default WeatherNowSkeleton