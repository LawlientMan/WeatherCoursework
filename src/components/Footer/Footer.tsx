import { Container } from 'react-bootstrap'
import styles from "@/components/Footer/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className='border-top mt-2 pt-2 pb-2'>
                <Container fluid='lg'>
                    <p className="text-center text-muted m-0">© 2024 Goose Weather React App. All rights reserved.</p>
                </Container>
            </div>
        </footer>
    )
}

export default Footer