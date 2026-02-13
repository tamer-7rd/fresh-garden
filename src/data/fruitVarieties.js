// Fruit varieties data parsed from CSV
// Maps fruit keys to their varieties for the modal display

export const fruitVarieties = {
    alma: {
        key: 'alma',
        folder: 'alma_cheshid',
        varieties: [
            'Buckey gala',
            'Pinkgold',
            'Granny smith Challenger',
            'Kande cinab',
            'Fuji',
            'Galaval',
            'Golden Reinders',
            'Rose Growe'
        ]
    },
    nektarin: {
        key: 'nektarin',
        folder: 'nektarin_cheshid',
        varieties: [
            'Queen diaymond',
            'Red Fair',
            'MONSAT',
            'Big glory',
            'Big heaven',
            'Conquete',
            'Late Fair',
            'Big Fire'
        ]
    },
    yastishaftali: {
        key: 'yastishaftali',
        folder: 'yasti_shaftali_cheshid',
        varieties: [
            'Samanta',
            'Zumba',
            'Contessa',
            'Ozilis',
            'Caramba',
            'Platibella',
            'Platinon',
            'Sauser',
            'Oreoni',
            'Galaxy',
            'Osiris',
            'Babylone'
        ]
    },
    gilas: {
        key: 'gilas',
        folder: 'Gilas_cheshid',
        varieties: [
            'Burlat',
            'Grace star',
            'N.DE MECHED',
            'Kordia',
            'Skeena',
            'Regina',
            'Sweetheart',
            'Fertad',
            'SPK342',
            'Carmen',
            'Folfer',
            'Ferdouce',
            'Royal helen',
            'Sabira',
            'Royal tioga',
            'Star Giant',
            'Sweet Gabryel',
            'Sweet Lorens',
            'Sweet Valina',
            'Marysa',
            'Sweet Aryana',
            'Royal Lafayette',
            'Early Red',
            'Gigant red'
        ]
    }
};

// Override map for variety names whose filenames don't follow the standard space→underscore rule
const filenameOverrides = {
    'Granny smith Challenger': 'Grannysmith_challenger',
    'Sabira': 'Sabrina',
    'N.DE MECHED': 'N.DE_MECHED',
};

// Eagerly import all variety images using Vite's import.meta.glob
const varietyImages = import.meta.glob(
    '../assets/images/*_cheshid/*.jpeg',
    { eager: true, import: 'default' }
);

// Build a lookup map: lowercase filename (without extension) → resolved URL
const imageLookup = {};
for (const [path, url] of Object.entries(varietyImages)) {
    // path looks like "../assets/images/alma_cheshid/Buckey_gala.jpeg"
    const filename = path.split('/').pop().replace('.jpeg', '').toLowerCase();
    imageLookup[filename] = url;
}

/**
 * Get the resolved image URL for a specific variety.
 * Returns the Vite-resolved URL string, or null if not found.
 */
export const getVarietyImageUrl = (fruitKey, varietyName) => {
    const normalizedKey = fruitKey?.toLowerCase().replace(/[^a-z]/g, '');
    const fruitData = fruitVarieties[normalizedKey];
    if (!fruitData) return null;

    // Determine filename: check overrides first, then default space→underscore
    const overrideName = filenameOverrides[varietyName];
    const filename = overrideName || varietyName.replace(/ /g, '_');

    // Look up case-insensitively
    const lookupKey = filename.toLowerCase();
    return imageLookup[lookupKey] || null;
};

// Helper function to get varieties by fruit key
export const getVarietiesByKey = (key) => {
    const normalizedKey = key?.toLowerCase().replace(/[^a-z]/g, '');
    return fruitVarieties[normalizedKey]?.varieties || [];
};

// Mapping from product index to fruit key (for integration with existing code)
export const productIndexToFruitKey = ['alma', 'nektarin', 'yastishaftali', 'gilas'];

export default fruitVarieties;
