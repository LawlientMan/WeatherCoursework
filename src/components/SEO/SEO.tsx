import { Helmet } from 'react-helmet-async'

interface SeoProps {
    title?: string;
    description?: string;
}

const SEO = ({ title = 'Weather', description = 'This is the weather website.' }: SeoProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default SEO