import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import LocationSearchItem from '@/components/LocationSearch/SearchMenu/SearchLocationOptionItem';

interface InputProps {
    locations: Location[] | null | undefined;
    activeOption: number;
    onLocationSelected: (location: Location) => void;
}

const LocationSearchItemsList = ({ locations, activeOption, onLocationSelected }: InputProps) => {
    return (
        <div className='menu'>
            <ListGroup>
                {locations && locations.length > 0
                    ? (
                        <>
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
                        </>
                    )
                    :
                    (<ListGroup.Item>Nothing where found.</ListGroup.Item>)
                }
            </ListGroup>
        </div>
    )
}

export default LocationSearchItemsList