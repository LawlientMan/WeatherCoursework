import React from 'react'
import { Form, Spinner } from 'react-bootstrap'

type A = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<A, 'loading'> {
    isLoading: Boolean;
}

const LocationSearchInput = (props: InputProps) => {
    const { isLoading, style, className, onClick, type, ...rest } = props;

    return (
        <Form.Group className="search" onClick={onClick}>
            <Form.Control
                className='search-input'
                type="search"
                {...rest}
            />
            <div className='search-buttons'>
                {isLoading
                    ? <Spinner className='search-spiner' animation="border" variant="primary" size="sm" />
                    : <button className='search-button' type="submit">
                        <img src="/src/assets/icons/searchx32.svg" alt="search" />
                    </button>
                }
            </div>
        </Form.Group>
    )
}

export default LocationSearchInput;