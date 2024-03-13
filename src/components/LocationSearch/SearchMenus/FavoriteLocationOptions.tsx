import LocationSearchItem from '@/components/LocationSearch/SearchMenus/LocationSearchItem';
import { IRootState } from '@/store';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Location } from '@/shared/types/Location';

interface InputProps {
    activeOption: number;
    onLocationSelected: (location: Location) => void;
}

const FavoriteLocationOptions = ({ activeOption, onLocationSelected }: InputProps) => {
    const favoriteLocations = useSelector((state: IRootState) => state.locations.favoriteLocations);

    return (
        <ListGroup>
            <ListGroup.Item variant="info">Favorites: {favoriteLocations.length == 0 && "still empty"}</ListGroup.Item>
            {favoriteLocations.map((location, index) => {
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
    )
}

export default FavoriteLocationOptions

{/* <Row>
                <Col xs="auto">sdsds</Col>
                <Col>
                    {location.Country.EnglishName}, {location.AdministrativeArea.EnglishName}, {location.EnglishName}
                </Col>
            </Row> */}