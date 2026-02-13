// Content file with all text from Fresh Garden.pdf
// Asset mappings for images and video

// Hero slider images
import heroImg1 from '../assets/images/IMG_8118.JPG';
import heroImg2 from '../assets/images/IMG_8129.JPG';

// About/Mission images
import aboutImg from '../assets/images/IMG_8120.JPG';
import missionImg from '../assets/images/IMG_8121.JPG';

// Gallery images
import gallery1 from '../assets/images/IMG_8122.JPG';
import gallery2 from '../assets/images/IMG_8123.JPG';
import gallery3 from '../assets/images/IMG_8124.JPG';
import gallery4 from '../assets/images/IMG_8136.JPG'; // Replaced missing 8125
import gallery5 from '../assets/images/IMG_8137.JPG'; // Replaced missing 8126
import gallery6 from '../assets/images/IMG_8127.JPG';
import gallery7 from '../assets/images/IMG_8128.JPG';
import gallery8 from '../assets/images/IMG_8129.JPG';
import gallery9 from '../assets/images/IMG_8138.JPG'; // Replaced missing 8130
import gallery10 from '../assets/images/IMG_8131.JPG';
import gallery11 from '../assets/images/IMG_8132.JPG';
import gallery12 from '../assets/images/IMG_8133.JPG';
import gallery13 from '../assets/images/IMG_8127.JPG'; // Replaced missing 8134 with duplicate
import gallery14 from '../assets/images/IMG_8135.JPG';
import gallery15 from '../assets/images/IMG_8140.JPG';
import gallery16 from '../assets/images/IMG_8128.JPG'; // Replaced missing 8141 with duplicate
import gallery17 from '../assets/images/IMG_8142.JPG';
import gallery18 from '../assets/images/IMG_8129.JPG'; // Replaced missing 8143 with duplicate

// Video - YouTube
// Video URL is stored directly in content object

// Page header backgrounds
import aboutPageBg from '../assets/images/IMG_8120.JPG';
import productsPageBg from '../assets/images/IMG_8121.JPG';

// Product images
import appleImg from '../assets/images/apple.jpeg';
import gilasImg from '../assets/images/gilas.jpg';
import nectarineImg from '../assets/images/nectarine.jpg';
import persikImg from '../assets/images/persik.jpg';

export const content = {
    // Company info
    company: {
        name: 'Fresh Garden Quba',
        tagline: 'Quba',
        phone: '+994 10 712 10 25',
        email: 'info@freshgardenquba.az',
        address: 'Qusar rayonu, Caqar kəndi,  Azərbaycan',

    },

    // Navigation
    navigation: [
        { name: 'Ana səhifə', path: '/' },
        { name: 'Haqqımızda', path: '/haqqimizda' },
        { name: 'Məhsullarımız', path: '/mehsullarimiz' }
    ],

    // Hero section
    hero: {
        slides: [
            {
                image: heroImg1,
                title: 'Fresh Garden Quba',
                subtitle: 'Təbiətin saflığını, torpağın bərəkətini və zəhmətimizin dəyərini birləşdirən yerli meyvə istehsalçısı'
            },
            {
                image: heroImg2,
                title: 'Keyfiyyətli Meyvələr',
                subtitle: 'Müştərilərimizə keyfiyyətli, təbii və sağlam meyvələr təqdim edirik'
            }
        ]
    },

    // About section (for homepage)
    about: {
        title: 'Haqqımızda',
        text: `Fresh Garden – təbiətin saflığını, torpağın bərəkətini və zəhmətimizin dəyərini birləşdirən yerli meyvə istehsalçısıdır. Şirkət 2000-ci ildən fəaliyyət göstərir və bu illər ərzində həm yerli, həm də beynəlxalq bazarlarda etibarlı tərəfdaş kimi tanınmışdır.

Məqsədimiz müştərilərimizə keyfiyyətli, təbii və sağlam meyvələr təqdim etməkdir. Fresh Garden alma, nektarin, yastı şaftalı, gilas və digər mövsümi meyvələrin becərilməsi, eləcə də topdan və pərakəndə satışının təşkili ilə məşğuldur. Hər bir məhsulumuz təbii üsullarla yetişdirilir, xüsusi qayğı ilə seçilir və müasir texnologiyalarla qablaşdırılır.`,
        image: aboutImg,
        buttonText: 'Daha ətraflı'
    },

    // Mission section (for homepage)
    mission: {
        title: 'Missiyamız',
        text: `Hər bir məhsulumuz təbii üsullarla yetişdirilir, xüsusi qayğı ilə seçilir və müasir texnologiyalarla qablaşdırılır.

Fresh Garden olaraq, biz yalnız meyvə istehsal etmirik – biz insanlara təmiz təbiətin dadını çatdırırıq. Məhsullarımız həm daxili bazarda supermarketlərə və distribütorlara, həm də xarici ölkələrə ixrac olunur.

Keyfiyyət, etibarlılıq və davamlı inkişaf prinsipləri bizim əsas dəyərlərimizdir.`,
        image: missionImg
    },

    // Full about page content
    aboutPage: {
        title: 'Haqqımızda',
        headerImage: aboutPageBg,
        content: `Fresh Garden – təbiətin saflığını, torpağın bərəkətini və zəhmətimizin dəyərini birləşdirən yerli meyvə istehsalçısıdır. Şirkət 2000-ci ildən fəaliyyət göstərir və bu illər ərzində həm yerli, həm də beynəlxalq bazarlarda etibarlı tərəfdaş kimi tanınmışdır.

Məqsədimiz müştərilərimizə keyfiyyətli, təbii və sağlam meyvələr təqdim etməkdir. Fresh Garden alma, nektarin, yastı şaftalı, gilas və digər mövsümi meyvələrin becərilməsi, eləcə də topdan və pərakəndə satışının təşkili ilə məşğuldur. Hər bir məhsulumuz təbii üsullarla yetişdirilir, xüsusi qayğı ilə seçilir və müasir texnologiyalarla qablaşdırılır.

Fresh Garden olaraq, biz yalnız meyvə istehsal etmirik – biz insanlara təmiz təbiətin dadını çatdırırıq. Məhsullarımız həm daxili bazarda supermarketlərə və distribütorlara, həm də xarici ölkələrə ixrac olunur.

Keyfiyyət, etibarlılıq və davamlı inkişaf prinsipləri bizim əsas dəyərlərimizdir. Müasir aqrotexniki yanaşma, təcrübəli mütəxəssislər və ekoloji məsuliyyət sayəsində Fresh Garden brendi qısa zamanda müştərilərin etibarını qazanmışdır.

🌱 Fresh Garden – təbiətdən gələn təmizlik və təravət.`,
        videoUrl: 'https://www.youtube.com/embed/JHjyo8blu7M'
    },

    // Products - With High Quality Unsplash Images
    products: {
        title: 'Məhsullarımız',
        headerImage: productsPageBg,
        items: [
            {
                name: 'Alma',
                image: appleImg,
                description: 'Qırmızı, şirəli və vitaminli Quba alması. Dadı ilə fərqlənir.'
            },
            {
                name: 'Nektarin',
                image: nectarineImg,
                description: 'Günəşin istiliyi ilə yetişmiş, şirəli və ətirli nektarinlər.'
            },
            {
                name: 'Yastı şaftalı',
                image: persikImg,
                description: 'Yumşaq, şirəli və ləzzətli yastı şaftalılarımız süfrənizin bəzəyi olacaq.'
            },
            {
                name: 'Gilas',
                image: gilasImg,
                description: 'Tünd qırmızı, iri və dadlı gilas növlərimiz.'
            }
        ]
    },

    // Gallery
    gallery: {
        title: 'Qalereya',
        images: [
            gallery1, gallery2, gallery3, gallery4, gallery5, gallery6,
            gallery7, gallery8, gallery9, gallery10, gallery11, gallery12,
            gallery13, gallery14, gallery15, gallery16, gallery17, gallery18
        ]
    },

    // Contact
    contact: {
        title: 'Əlaqə',
        phone: '+994 55 660 10 50',
        email: 'freshgardenquba.mmc@gmail.com',
        address: 'Qusar rayonu, Caqar kəndi, Azərbaycan',

    }
};

export default content;
