// Fruit varieties data parsed from CSV
// Maps fruit keys to their varieties for the modal display

export const fruitVarieties = {
    alma: {
        key: 'alma',
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

// Helper function to get varieties by fruit key
export const getVarietiesByKey = (key) => {
    const normalizedKey = key?.toLowerCase().replace(/[^a-z]/g, '');
    return fruitVarieties[normalizedKey]?.varieties || [];
};

// Mapping from product index to fruit key (for integration with existing code)
export const productIndexToFruitKey = ['alma', 'nektarin', 'yastishaftali', 'gilas'];

export default fruitVarieties;
