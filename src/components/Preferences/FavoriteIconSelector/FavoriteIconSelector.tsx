import FavoriteStarImg from '@/components/common/FavoriteStarImg';
import { setFavoriteIcon } from '@/features/preferences/preferencesSlice';
import { IRootState } from '@/config/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from "@/components/Preferences/FavoriteIconSelector/FavoriteIconSelector.module.css";
import { appConfig } from '@/config/appConfig';

const FavoriteIconSelector = () => {
    const dispatch = useDispatch();
    const iconPreference = useSelector((state: IRootState) => state.preferences.favoriteIcon);
    const icons = appConfig.supportedFavoriteIcons;

    const setIcon = (value: string) => {
        dispatch(setFavoriteIcon(value))
    }

    return (
        <div className='mb-3'>
            <p>Favorite icon:</p>
            {icons.map(i => (
                <button className={styles.selectFavoriteButton} onClick={() => setIcon(i)}>
                    <FavoriteStarImg key={i.length} isActive={iconPreference === i} icon={i} />
                </button>
            ))}
        </div>
    )
}

export default FavoriteIconSelector