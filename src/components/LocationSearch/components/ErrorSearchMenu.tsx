import { ListGroup } from 'react-bootstrap'

const ErrorSearchMenu = () => {
    return (
        <div className='menu'>
            <ListGroup>
                <ListGroup.Item variant='danger'>
                    Something went wrong.
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default ErrorSearchMenu