import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import LocationSearchItem from '@/components/LocationSearch/LocationSearchItem';

interface InputProps {
    locations: Location[] | null;
    activeOption: number;
    onLocationSelected: (location: Location) => void;
}

const LocationSearchItemsList = ({ locations, activeOption, onLocationSelected }: InputProps) => {
    return (
        <>
            {locations && locations.length > 0
                ? <ListGroup>
                    {locations.map((location, index) => {
                        return (
                            <LocationSearchItem
                                key={location.Key}
                                location={location}
                                isActive={index === activeOption}
                                onLocationSelected={onLocationSelected}
                            />
                        )
                    })}
                </ListGroup>
                : <ListGroup>
                    <ListGroup.Item>
                        Nothing where found.
                    </ListGroup.Item>
                </ListGroup>
            }
        </>
    )
}

export default LocationSearchItemsList