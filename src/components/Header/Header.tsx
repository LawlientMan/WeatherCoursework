import HeaderLogo from "@/components/Header/HeaderLogo";
import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas, Stack } from "react-bootstrap"
import { Link } from "react-router-dom";

const Header = () => {
    const expand = 'md';
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className='header' data-bs-theme="dark">
            <Navbar expand={expand} className="bg-body-tertiary mb-3" collapseOnSelect aria-controls='offcanvasNavbar'>
                <Container fluid='lg'>
                    <Stack direction="horizontal" gap={3}>
                        <Navbar.Toggle aria-controls='offcanvasNavbar'
                            onClick={toggleMenu}
                        />
                        <HeaderLogo onLogoClick={closeMenu} />
                    </Stack>
                    <Navbar.Offcanvas
                        id='offcanvasNavbar'
                        aria-labelledby='offcanvasNavbarLabel'
                        placement="start"
                        restoreFocus={false}
                        show={menuOpen}
                        onHide={closeMenu}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel'>
                                <HeaderLogo onLogoClick={closeMenu} />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/" onClick={closeMenu}>Home</Nav.Link>
                                <Nav.Link as={Link} to="/about" onClick={closeMenu}>About</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header