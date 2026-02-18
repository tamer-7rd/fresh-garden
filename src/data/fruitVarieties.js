// Fruit varieties data parsed from CSV
// Maps fruit keys to their varieties for the modal display

export const fruitVarieties = {
    alma: {
        key: 'alma',
        folder: 'alma_cheshid',
        varieties: [
            'Buckeye Gala',
            'Pink Gold',
            'Granny Challenger',
            'Kandil Sinap',
            'Fuji',
            'Galaval P.V.R.',
            'Golden Reinders',
            'Rosy Glow'
        ]
    },
    nektarin: {
        key: 'nektarin',
        folder: 'nektarin_cheshid',
        varieties: [
            'Queen Diamond®',
            'Red Fair®',
            'MONSAT',
            'Big Glory',
            'Big Heaven',
            'Conquête®',
            'Late Fair®',
            'Big Fire® (ZAI 691 NJ)'
        ]
    },
    yastishaftali: {
        key: 'yastishaftali',
        folder: 'yasti_shaftali_cheshid',
        varieties: [
            'Samanta',
            'Zumba (HA547‑14 PPB)®',
            'Contessa®',
            'Caramba',
            'Platibelle',
            'Platimoon / Platifun',
            'Sauzee®',
            'Orion™ (UFO 4)',
            'Galaxy',
            'Osiris',
            'Babylone®'
        ]
    },
    gilas: {
        key: 'gilas',
        folder: 'Gilas_cheshid',
        varieties: [
            'Bigarreau Burlat',
            'Grace Star®',
            'Noir de Meched',
            'Kordia',
            'Skeena P.V.R.',
            'Regina',
            'Sweet Heart®',
            'Fertard',
            'SPC 342 P.V.R.',
            'Carmen P.V.R.',
            'Folfer P.V.R.',
            'Ferdouce (V3239)',
            'Royal Helen P.V.R.',
            'Sabrina®',
            'Royal Tioga',
            'Star Giant',
            'Sweet Gabriel®',
            'Sweet Lorenz®',
            'Sweet Valina®',
            'Marysa® (PA6UNIBO)',
            'Sweet Aryana®',
            'Royal Lafayette P.V.R.',
            'Early Red® (Maraly)',
            'Giant Red® / Prime Giant'
        ]
    }
};

// Override map for variety names whose filenames don't follow the standard space→underscore rule
const filenameOverrides = {
    // Alma
    'Buckeye Gala': 'Buckey_gala',
    'Pink Gold': 'Pinkgold',
    'Granny Challenger': 'Grannysmith_challenger',
    'Kandil Sinap': 'Kande_cinab',
    'Galaval P.V.R.': 'Galaval',
    'Rosy Glow': 'Rose_Growe',
    // Nektarin
    'Queen Diamond®': 'Queen_diaymond',
    'Red Fair®': 'Red_fair',
    'Big Glory': 'Big_glory',
    'Big Heaven': 'Big_heaven',
    'Conquête®': 'Conquete',
    'Late Fair®': 'Late_Fair',
    'Big Fire® (ZAI 691 NJ)': 'Big_Fire',
    // Yastı şaftalı
    'Zumba (HA547‑14 PPB)®': 'Zumba',
    'Contessa®': 'Contessa',
    'Platibelle': 'Platibella',
    'Platimoon / Platifun': 'Platinon',
    'Sauzee®': 'Sauser',
    'Orion™ (UFO 4)': 'Oreoni',
    'Babylone®': 'Babylone',
    // Gilas
    'Bigarreau Burlat': 'Burlat',
    'Grace Star®': 'Grace_star',
    'Noir de Meched': 'N.DE_MECHED',
    'Skeena P.V.R.': 'Skeena',
    'Sweet Heart®': 'Sweetheart',
    'Fertard': 'Fertad',
    'SPC 342 P.V.R.': 'SPK342',
    'Carmen P.V.R.': 'Carmen',
    'Folfer P.V.R.': 'Folfer',
    'Ferdouce (V3239)': 'Ferdouce',
    'Royal Helen P.V.R.': 'Royal_helen',
    'Sabrina®': 'Sabrina',
    'Royal Tioga': 'royal_tioga',
    'Sweet Gabriel®': 'Sweet_Gabryel',
    'Sweet Lorenz®': 'Sweet_Lorens',
    'Sweet Valina®': 'Sweet_Valina',
    'Marysa® (PA6UNIBO)': 'Marysa',
    'Sweet Aryana®': 'Sweet_Aryana',
    'Royal Lafayette P.V.R.': 'Royal_Lafayette',
    'Early Red® (Maraly)': 'Early_Red',
    'Giant Red® / Prime Giant': 'Gigant_red',
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
