import WeatherIcon from '@/components/Weather/common/WeatherIcon'
import React from 'react'
import { Card, Col, Placeholder, Row } from 'react-bootstrap'

const WeatherHourlySkeleton = () => {
    const array = [...Array(12).keys()];

    return (
        <>
            {array.map((i) => (
                <Col key={i} xs={12} sm={6} md={3} xxl={2} className="mb-3">
                    <Card className='h-100'>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={4} />
                            </Placeholder>
                            <Placeholder as={Card.Subtitle} className="text-muted" animation="glow">
                                <Placeholder xs={7} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={8} />
                            </Placeholder>
                            <WeatherIcon imageIndex={null} className='weather-icon card-img-bottom' />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    )
}

export default WeatherHourlySkeleton