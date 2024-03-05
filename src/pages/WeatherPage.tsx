import LocationSearch from "@/components/LocationSearch/LocationSearch"
import SEO from "@/components/SEO/SEO"

const WeatherPage = () => {

    return (
        <>
            <SEO title="Weather Page" description="This is the weather page of weather website." />
            <div>WeatherPage</div>
            <LocationSearch onLocationSelected={(l)=> console.log(l)}/>
        </>
    )
}

export default WeatherPage