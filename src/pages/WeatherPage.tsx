import SEO from "@/components/SEO/SEO"
import { useGetLocationsQuery } from "@/features/locations/locationsApi"

const WeatherPage = () => {
    const { data, error, isLoading } = useGetLocationsQuery('Minsk',  { skip: true })

    return (
        <>
            <SEO title="Weather Page" description="This is the weather page of weather website." />
            <div>WeatherPage</div>
            <div><pre>{JSON.stringify(error, null, 2)}</pre></div>
            <div><pre>{isLoading }</pre></div>
            <div><pre>{JSON.stringify(data, null, 2) }</pre></div>
        </>
    )
}

export default WeatherPage