import HeaderLogo from "@/components/Header/HeaderLogo";
import { Container, Nav, Navbar, Offcanvas, Stack } from "react-bootstrap"
import { Link } from "react-router-dom";

const Header = () => {
    const expand = 'md';

    return (
        <header className='header' data-bs-theme="dark">
            <Navbar expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid='lg'>
                    <Stack direction="horizontal" gap={3}>
                        <Navbar.Toggle aria-controls='offcanvasNavbar' />
                        <HeaderLogo />
                    </Stack>
                    <Navbar.Offcanvas
                        id='offcanvasNavbar'
                        aria-labelledby='offcanvasNavbarLabel'
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel'>
                                <HeaderLogo />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header