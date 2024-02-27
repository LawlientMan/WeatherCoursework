import siteLogo from '@/assets/goose_logo.png';
import { Navbar } from 'react-bootstrap'

const HeaderLogo = () => {
    return (
        <Navbar.Brand href="/" className='me-0'>
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