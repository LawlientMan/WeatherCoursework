import FavoriteStarImg from '@/components/common/FavoriteStarImg';
import { preferencesSlice, AvailableFavoriteIcons } from '@/features/preferences/preferencesSlice';
import store, { IRootState } from '@/config/store';
import { useSelector } from 'react-redux';
import styles from "@/components/Preferences/FavoriteIconSelector/FavoriteIconSelector.module.css";

const FavoriteIconSelector = () => {
    const iconPreference = useSelector((state: IRootState) => state.preferences.favoriteIcon);

    const setIcon = (value: string) => {
        store.dispatch(preferencesSlice.actions.setFavoriteIcon(value))
    }

    return (
        <div className='mb-3'>
            <p>Favorite icon:</p>
            {AvailableFavoriteIcons.map(i => (
                <button className={styles.selectFavoriteButton} onClick={() => setIcon(i)}>
                    <FavoriteStarImg key={i} isActive={iconPreference === i} icon={i} />
                </button>
            ))}
        </div>
    )
}

export default FavoriteIconSelector