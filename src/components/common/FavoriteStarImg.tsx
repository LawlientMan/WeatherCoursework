import { IRootState } from '@/config/store';
import { useSelector } from 'react-redux';

export interface InputProps {
    isActive: boolean | null;
    icon?: string | null;
}

const FavoriteStarImg = ({ isActive, icon = null}: InputProps) => {
    const iconPreference = useSelector((state: IRootState) => state.preferences.favoriteIcon);
    const useIcon = icon || iconPreference;

    const imageName = isActive ? useIcon : useIcon + 'Gray';
    const imageSrc = `/src/assets/icons/${imageName}.svg`

    return (
        <img src={imageSrc} alt="favorite" />
    )
}

export default FavoriteStarImg