// SEO data for all pages
// This file contains meta information for SEO optimization

export const seoData = {
    // Global site info
    site: {
        name: 'Fresh Garden Quba',
        url: 'https://freshgardenquba.az',
        locale: 'az_AZ',
        type: 'website',
        author: 'Fresh Garden',
        themeColor: '#22c55e',
        defaultImage: '/og-image.jpg?v=1'
    },

    // Page-specific SEO
    pages: {
        home: {
            title: 'Fresh Garden Quba | Təbii Meyvələr İstehsalçısı',
            description: 'Fresh Garden - Qubada 2000-ci ildən fəaliyyət göstərən yerli meyvə istehsalçısı. Təbii alma, nektarin, yastı şaftalı, gilas və digər mövsümi meyvələr. Soyuducu ambar və çeşidləmə xidmətləri.',
            keywords: 'Fresh Garden, Quba meyvələr, təbii meyvələr, alma, nektarin, yastı şaftalı, gilas, Azərbaycan meyvələri, yerli istehsal, sağlam qida, soyuducu ambar, çeşidləmə, cold storage, sorting, xidmətlər',
            canonical: '/'
        },
        about: {
            title: 'Haqqımızda | Fresh Garden Quba',
            description: 'Fresh Garden haqqında - 2000-ci ildən fəaliyyət göstərən yerli meyvə istehsalçısı. Missiyamız, dəyərlərimiz və keyfiyyət prinsiplərimiz.',
            keywords: 'Fresh Garden haqqında, şirkət tarixi, missiya, Quba meyvə ferması, Azərbaycan kənd təsərrüfatı',
            canonical: '/haqqimizda'
        },
        products: {
            title: 'Məhsullarımız | Fresh Garden Quba',
            description: 'Fresh Garden məhsulları - təbii üsullarla yetişdirilmiş alma, nektarin, yastı şaftalı, gilas. 100% təbii, yüksək keyfiyyətli Quba meyvələri.',
            keywords: 'alma, nektarin, yastı şaftalı, gilas, təbii meyvə, Quba alması, mövsümi meyvələr, topdan satış',
            canonical: '/mehsullarimiz'
        }
    },

    // Structured data for organization
    organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Fresh Garden',
        alternateName: 'Fresh Garden Quba',
        url: 'https://freshgardenquba.az',
        logo: 'https://freshgardenquba.az/logo.png',
        description: 'Təbiətin saflığını, torpağın bərəkətini və zəhmətimizin dəyərini birləşdirən yerli meyvə istehsalçısı',
        foundingDate: '2000',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+994-55-660-10-50',
            contactType: 'customer service',
            areaServed: 'AZ',
            availableLanguage: ['az', 'ru', 'en']
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Qusar rayonu, Caqar kəndi',
            addressCountry: 'AZ'
        },
        sameAs: []
    },

    // Local business structured data
    localBusiness: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://freshgardenquba.az/#business',
        name: 'Fresh Garden',
        image: 'https://freshgardenquba.az/og-image.jpg?v=1',
        telephone: '+994-55-660-10-50',
        email: 'freshgardenquba.mmc@gmail.com',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Qusar rayonu, Caqar kəndi',
            addressCountry: 'AZ'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 41.3611,
            longitude: 48.5131
        },
        priceRange: '$$',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '18:00'
        }
    }
};

export default seoData;
