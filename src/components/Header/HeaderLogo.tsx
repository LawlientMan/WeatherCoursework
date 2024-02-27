import siteLogo from '@/assets/goose_logo.png';
import { Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";

interface HeaderLogoProps {
    onLogoClick: () => void;
}

const HeaderLogo = ({onLogoClick}: HeaderLogoProps) => {
    return (
        <Navbar.Brand as={Link} to="/" className='me-0' onClick={onLogoClick}>
            <img
                alt="logo"
                src={siteLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Weather Forecast
        </Navbar.Brand>
    )
}

export default HeaderLogo