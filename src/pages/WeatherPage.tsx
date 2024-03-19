import LocationSearch from "@/components/LocationSearch/LocationSearch"
import SEO from "@/components/SEO/SEO"
import WeatherNow from "@/components/Weather/Now/WeatherNow"
import { IRootState } from "@/config/store"
import { useEffect, useState } from "react"
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Weather5Days from "@/components/Weather/5Days/Weather5Days"
import WeatherHourly from "@/components/Weather/Hourly/WeatherHourly"
import { useNavigate, useParams } from "react-router-dom"
import { useInitialLoadOfLocationFromUrl } from "@/components/Weather/hooks/useInitialLoadOfLocationFromUrl"
import { setCurrentLocation } from "@/features/locations/locationSlice"
import { Location } from '@/shared/types/Location';

enum ViewMode {
    Now = "now",
    Hourly = "hourly",
    FiveDays = "5days"
}

const isViewMode = (viewMode: string | undefined): boolean => {
    return Object.values(ViewMode).includes(viewMode as ViewMode);
}

const WeatherPage = () => {
    const { viewmode, locationKey } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedViewMode, setSelectedViewMode] = useState(isViewMode(viewmode) ? viewmode : ViewMode.Now);
    const [useInitialLoadData, setUseInitialLoadData] = useState(true);

    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { isFetching, error, isNotFound } = useInitialLoadOfLocationFromUrl();

    useEffect(() => {
        if (!locationKey) {
            dispatch(setCurrentLocation(null));
            setUseInitialLoadData(false);
        }
    }, [locationKey]);

    if (useInitialLoadData && isFetching) return 'Loading....';
    if (useInitialLoadData && error) return 'something gose wrong....';
    if (useInitialLoadData && isNotFound) return 'not found';

    const weatcherViewComponent = () => {
        switch (selectedViewMode) {
            case ViewMode.Now: return <WeatherNow />;
            case ViewMode.Hourly: return <WeatherHourly />;
            case ViewMode.FiveDays: return <Weather5Days />;
            default: <></>
        }
    }

    function handleViewModeChange(value: ViewMode): void {
        setSelectedViewMode(value);
        if (selectedLocation) {
            navigate(`/weather/${selectedLocation.Key}/${value}`);
        }
    }

    const handleLocationSelect = (location: Location) => {
        dispatch(setCurrentLocation(location));
        navigate(`/weather/${location.Key}/${selectedViewMode}`);
    }

    return (
        <>
            <SEO title="Goose weather" description="This is the weather page of goose weather website." />
            <Row>
                <Col xl={4} md={6} xs={12} className="mb-3">
                    <LocationSearch onLocationSelected={handleLocationSelect} />
                </Col>

                {selectedLocation &&
                    <>
                        <Col xl={4} md={6} xs={12} className="mb-3">
                            <ToggleButtonGroup className="w-100" type="radio" name="options" value={selectedViewMode} onChange={handleViewModeChange}>
                                <ToggleButton className="toggle-mode" id="tbg-now" variant="outline-primary" value={ViewMode.Now}>
                                    Now
                                </ToggleButton>
                                <ToggleButton className="toggle-mode" id="tbg-hourly" variant="outline-primary" value={ViewMode.Hourly}>
                                    Hourly
                                </ToggleButton>
                                <ToggleButton className="toggle-mode" id="tbg-tendays" variant="outline-primary" value={ViewMode.FiveDays}>
                                    5 Days
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </>

                }
            </Row>
            {selectedLocation &&
                <Row>
                    {weatcherViewComponent()}
                </Row>
            }
        </>
    )
}

export default WeatherPage