import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';

interface InputProps {
    locations: Location[] | null;
    activeOption: number;
}

const LocationOptions = ({ locations, activeOption }: InputProps) => {
    return (
        <div>
            {locations && locations.length > 0
                ? <div>
                    <ListGroup>
                        {locations.map((location, index) => {
                            return (<ListGroup.Item
                                action
                                key={location.Key}
                                active={index == activeOption}>
                                {location.Country.EnglishName}, {location.AdministrativeArea.EnglishName}, {location.EnglishName}
                            </ListGroup.Item>)
                        })}
                    </ListGroup>
                </div>
                : <div>
                    <ListGroup>
                        <ListGroup.Item>
                            Nothing where found.
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            }
        </div>
    )
}

export default LocationOptions