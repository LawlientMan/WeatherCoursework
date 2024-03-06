import LocationSearch from "@/components/LocationSearch/LocationSearch"
import SEO from "@/components/SEO/SEO"
import { useGetTodaysWeatherQuery } from "@/features/weather/weatherApi"
import { Location } from "@/shared/types/Location"
import { useState } from "react"
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"

const WeatherPage = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const { data, error, isFetching } = useGetTodaysWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    const handleLocationSelection = (location: Location) => {
        console.log(location);
        setSelectedLocation(location);
    }

    console.log(data);

    return (
        <>
            <SEO title="Weather Page" description="This is the weather page of weather website." />
            <Row>
                <Col xl={4} md={6} xs={12} mb={3} className="mb-3">
                    <LocationSearch onLocationSelected={handleLocationSelection} selectedLocation={selectedLocation} />
                </Col>

                {selectedLocation &&
                    <Col className="mb-3">
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton className="toggle-mode" id="tbg-now" variant="outline-primary" value={1}>
                                Now
                            </ToggleButton>
                            <ToggleButton className="toggle-mode" id="tbg-today" variant="outline-primary" value={2}>
                                Today
                            </ToggleButton>
                            <ToggleButton className="toggle-mode" id="tbg-tendays" variant="outline-primary" value={3}>
                                10 Days
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                }
            </Row>
        </>
    )
}

export default WeatherPage