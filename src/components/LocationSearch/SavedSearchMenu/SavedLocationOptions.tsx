import LocationSearchItem from '@/components/LocationSearch/SearchMenu/SearchLocationOptionItem';
import { IRootState } from '@/store';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Location } from '@/shared/types/Location';
import LocationSavedItem from '@/components/LocationSearch/SavedSearchMenu/SavedLocationOptionItem';

interface InputProps {
    activeOption: number;
    onLocationSelected: (location: Location) => void;
}

const FavoriteLocationOptions = ({ activeOption, onLocationSelected }: InputProps) => {
    const favoriteLocations = useSelector((state: IRootState) => state.locations.favoriteLocations);
    const recentLocations = useSelector((state: IRootState) => state.locations.recentLocations);

    const recentLocationsWithoutFavorites = recentLocations
        .filter(el => !favoriteLocations.find(f => f.Key === el.Key ));

    return (
        <ListGroup>
            <ListGroup.Item variant="info">Favorites: {favoriteLocations.length == 0 && " empty"}</ListGroup.Item>
            {favoriteLocations.map((location, index) => {
                return (
                    <LocationSavedItem
                        key={location.Key}
                        location={location}
                        isActive={index === activeOption}
                        isInFavorite={true}
                        onLocationSelected={onLocationSelected}
                    />
                )
            })}

            {recentLocationsWithoutFavorites.length > 0 &&
                <>
                    <ListGroup.Item variant="info">Recent:</ListGroup.Item>
                    {recentLocationsWithoutFavorites.map((location, index) => {
                        return (
                            <LocationSavedItem
                                key={location.Key}
                                location={location}
                                isActive={index === activeOption}
                                isInFavorite={false}
                                onLocationSelected={onLocationSelected}
                            />
                        )
                    })}
                </>
            }

        </ListGroup>
    )
}

export default FavoriteLocationOptions

