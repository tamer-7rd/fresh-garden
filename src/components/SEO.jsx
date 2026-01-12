import { Helmet } from 'react-helmet-async';
import { seoData } from '../content/seoData';

/**
 * SEO Component for managing page-level meta tags
 * @param {Object} props
 * @param {string} props.page - Page key from seoData (home, about, products)
 * @param {string} [props.title] - Override title
 * @param {string} [props.description] - Override description
 * @param {string} [props.image] - Override OG image
 * @param {string} [props.type] - Page type (website, article)
 * @param {Object} [props.structuredData] - Additional structured data
 */
const SEO = ({
    page = 'home',
    title,
    description,
    image,
    type = 'website',
    structuredData
}) => {
    const pageData = seoData.pages[page] || seoData.pages.home;
    const site = seoData.site;

    const metaTitle = title || pageData.title;
    const metaDescription = description || pageData.description;
    const metaImage = image || `${site.url}${site.defaultImage}`;
    const canonicalUrl = `${site.url}${pageData.canonical}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={pageData.keywords} />
            <meta name="author" content={site.author} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Language */}
            <html lang="az" />
            <meta property="og:locale" content={site.locale} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={site.name} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={canonicalUrl} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Open Graph Image Dimensions */}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Additional structured data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
