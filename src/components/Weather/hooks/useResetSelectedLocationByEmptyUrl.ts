import { setCurrentLocation } from "@/features/locations/locationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const useResetSelectedLocationByEmptyUrl = () => {
    const { locationKey } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!locationKey){
            dispatch(setCurrentLocation(null));
        }
    }, [locationKey]);
}
