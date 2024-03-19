import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import LocationSavedItem from '@/components/LocationSearch/SavedSearchMenu/SavedLocationOptionItem';

interface InputProps {
    activeOption: number;
    onLocationSelected: (location: Location) => void;
    favoriteLocations: Location[];
    recentLocations: Location[];
}

const FavoriteLocationOptions = (
    { activeOption, onLocationSelected, favoriteLocations, recentLocations }: InputProps) => {



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

            {recentLocations.length > 0 &&
                <>
                    <ListGroup.Item variant="info">Recent:</ListGroup.Item>
                    {recentLocations.map((location, index) => {
                        return (
                            <LocationSavedItem
                                key={location.Key}
                                location={location}
                                isActive={(favoriteLocations.length + index) === activeOption}
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

