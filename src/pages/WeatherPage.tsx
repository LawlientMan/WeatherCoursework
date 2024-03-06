import LocationSearch from "@/components/LocationSearch/LocationSearch"
import SEO from "@/components/SEO/SEO"
import { Location } from "@/shared/types/Location"
import { useState } from "react"

const WeatherPage = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const handleLocationSelection = (location: Location) => {
        console.log(location);
        setSelectedLocation(location);
    }

    return (
        <>
            <SEO title="Weather Page" description="This is the weather page of weather website." />
            <div>WeatherPage</div>
            <LocationSearch onLocationSelected={handleLocationSelection} selectedLocation={selectedLocation} />
        </>
    )
}

export default WeatherPage