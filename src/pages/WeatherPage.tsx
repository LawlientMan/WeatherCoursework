import LocationSearch from "@/components/LocationSearch/LocationSearch"
import SEO from "@/components/SEO/SEO"
import WeatherNow from "@/components/Weather/Now/WeatherNow"
import { IRootState } from "@/store"
import { useState } from "react"
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import Weather5Days from "@/components/Weather/5Days/Weather5Days"
import WeatherHourly from "@/components/Weather/Hourly/WeatherHourly"

enum ViewMode {
    Now,
    Hourly,
    FiveDays
}

const WeatherPage = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const [viewMode, setViewMode] = useState(ViewMode.Now);

    const weatcherViewComponent = () => {
        switch (viewMode) {
            case ViewMode.Now: return <WeatherNow />;
            case ViewMode.Hourly: return <WeatherHourly />;
            case ViewMode.FiveDays: return <Weather5Days />;
            default: <></>
        }
    }

    return (
        <>
            <SEO title="Weather Page" description="This is the weather page of weather website." />
            <Row>
                <Col xl={4} md={6} xs={12} className="mb-3">
                    <LocationSearch />
                </Col>

                {selectedLocation &&
                    <>
                        <Col xl={4} md={6} xs={12} className="mb-3">
                            <ToggleButtonGroup className="w-100" type="radio" name="options" value={viewMode} onChange={setViewMode}>
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