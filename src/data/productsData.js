// Unified product data source
// Combines product info with variety data for slug-based routing

import appleImg from '../assets/images/apple.jpeg';
import gilasImg from '../assets/images/gilas.jpg';
import nectarineImg from '../assets/images/nectarine.jpg';
import persikImg from '../assets/images/persik.jpg';

// Page header images (full-width hero backgrounds)
import applePageImg from '../assets/images/apple_page.jpeg';
import nectarinePageImg from '../assets/images/nectarine_page.jpeg';
import donutPeachPageImg from '../assets/images/donut-peach_page.jpeg';
import cherryPageImg from '../assets/images/cherry_page.jpeg';

import { fruitVarieties, getVarietyImageUrl } from './fruitVarieties';

/**
 * Each product has:
 *  - title: display name (Azerbaijani, used as fallback)
 *  - slug: URL-safe identifier
 *  - fruitKey: key in fruitVarieties data
 *  - image: main product image
 *  - varieties: array of { name, imageSrc }
 */
export const productsData = [
    {
        title: 'Alma',
        slug: 'alma',
        fruitKey: 'alma',
        image: appleImg,
        pageImage: applePageImg,
        get varieties() {
            return (fruitVarieties.alma?.varieties || []).map(name => ({
                name,
                imageSrc: getVarietyImageUrl('alma', name)
            }));
        }
    },
    {
        title: 'Nektarin',
        slug: 'nektarin',
        fruitKey: 'nektarin',
        image: nectarineImg,
        pageImage: nectarinePageImg,
        get varieties() {
            return (fruitVarieties.nektarin?.varieties || []).map(name => ({
                name,
                imageSrc: getVarietyImageUrl('nektarin', name)
            }));
        }
    },
    {
        title: 'Yastı şaftalı',
        slug: 'yasti-shaftali',
        fruitKey: 'yastishaftali',
        image: persikImg,
        pageImage: donutPeachPageImg,
        get varieties() {
            return (fruitVarieties.yastishaftali?.varieties || []).map(name => ({
                name,
                imageSrc: getVarietyImageUrl('yastishaftali', name)
            }));
        }
    },
    {
        title: 'Gilas',
        slug: 'gilas',
        fruitKey: 'gilas',
        image: gilasImg,
        pageImage: cherryPageImg,
        get varieties() {
            return (fruitVarieties.gilas?.varieties || []).map(name => ({
                name,
                imageSrc: getVarietyImageUrl('gilas', name)
            }));
        }
    }
];

/**
 * Find a product by its URL slug.
 * @param {string} slug
 * @returns {object|undefined}
 */
export const getProductBySlug = (slug) => {
    return productsData.find(p => p.slug === slug);
};

/**
 * Get the slug for a product by its index (matches the order in content.js / translations).
 * @param {number} index
 * @returns {string}
 */
export const getSlugByIndex = (index) => {
    return productsData[index]?.slug || '';
};

export default productsData;
