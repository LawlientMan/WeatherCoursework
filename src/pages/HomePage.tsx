import SEO from "@/components/SEO/SEO"
import { Col, Row, Image } from "react-bootstrap"

const HomePage = () => {
    return (
        <>
            <SEO title="Goose weather home" description="This is the home page of goose weather website." />
            <Row className="mb-3">
                <Col className="text-center">
                    <h3>Welcome to goose weather react app.</h3>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} md={6} xl={4}>
                    <Image className="w-100" src="/src/assets/goose-programmer.png" rounded />
                </Col>
            </Row>
        </>
    )
}

export default HomePage