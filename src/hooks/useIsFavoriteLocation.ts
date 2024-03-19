import { IRootState } from '@/config/store';
import { Location } from '@/shared/types/Location';
import { useSelector } from 'react-redux';

export const useIsFavoriteLocation = (location: Location | null | undefined) =>  {
    const favorites = useSelector((state: IRootState) => state.locations.favoriteLocations);
    return Boolean(location && favorites.some(el => el.Key === location.Key));
};