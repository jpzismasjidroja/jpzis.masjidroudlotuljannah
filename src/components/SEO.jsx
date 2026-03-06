import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    image = '/logo-masjid.webp',
    url,
    type = 'website',
    keywords = '',
    structuredData = null
}) => {
    const siteName = "LAZIS Masjid Jami' Roudlotul Jannah";
    const baseUrl = 'https://jpzis.masjidroja.com';

    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const fullImage = image?.startsWith('http') ? image : `${baseUrl}${image}`;
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}

            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="id_ID" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={fullImage} />

            <link rel="canonical" href={fullUrl} />

            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
