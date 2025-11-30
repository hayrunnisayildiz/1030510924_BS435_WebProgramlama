import type { ImageSet } from "../types/index";

export const imageSets: ImageSet[] = [
    {
        id: 1,
        difficulty: 'easy',
        images: [
            {
                id: 'img1-1',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                isAI: false,
                category: 'doğa'
            },
            {
                id: 'img1-2',
                url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
                isAI: false,
                category: 'doğa'
            },
            {
                id: 'img1-3',
                url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
                isAI: true,
                category: 'doğa',
                hint: 'Ağaç yapraklarının detaylarına dikkat et - bazı yerler çok düzgün görünüyor'
            }
        ]
    },
    {
        id: 2,
        difficulty: 'easy',
        images: [
            {
                id: 'img2-1',
                url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
                isAI: false,
                category: 'portre'
            },
            {
                id: 'img2-2',
                url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                isAI: true,
                category: 'portre',
                hint: 'Yüz simetrisine ve arka plan detaylarına dikkat et'
            },
            {
                id: 'img2-3',
                url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
                isAI: false,
                category: 'portre'
            }
        ]
    },
    {
        id: 3,
        difficulty: 'easy',
        images: [
            {
                id: 'img3-1',
                url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
                isAI: false,
                category: 'şehir'
            },
            {
                id: 'img3-2',
                url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
                isAI: true,
                category: 'şehir',
                hint: 'Pencere yansımalarında tutarsızlıklar var'
            },
            {
                id: 'img3-3',
                url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
                isAI: false,
                category: 'şehir'
            }
        ]
    },
    {
        id: 4,
        difficulty: 'medium',
        images: [
            {
                id: 'img4-1',
                url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
                isAI: false,
                category: 'hayvanlar'
            },
            {
                id: 'img4-2',
                url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
                isAI: true,
                category: 'hayvanlar',
                hint: 'Tüylerin dokusu çok mükemmel - gerçek hayvanlar bu kadar simetrik olmaz'
            },
            {
                id: 'img4-3',
                url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800',
                isAI: false,
                category: 'hayvanlar'
            }
        ]
    },
    {
        id: 5,
        difficulty: 'medium',
        images: [
            {
                id: 'img5-1',
                url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
                isAI: false,
                category: 'manzara'
            },
            {
                id: 'img5-2',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                isAI: false,
                category: 'manzara'
            },
            {
                id: 'img5-3',
                url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
                isAI: true,
                category: 'manzara',
                hint: 'Bulutların dağılımı çok düzenli ve su yansımaları yapay görünüyor'
            }
        ]
    },
    {
        id: 6,
        difficulty: 'hard',
        images: [
            {
                id: 'img6-1',
                url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
                isAI: true,
                category: 'yemek',
                hint: 'Tabakların düzeni ve ışık dağılımı çok mükemmel - gerçek fotoğraflarda böyle olmaz'
            },
            {
                id: 'img6-2',
                url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
                isAI: false,
                category: 'yemek'
            },
            {
                id: 'img6-3',
                url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
                isAI: false,
                category: 'yemek'
            }
        ]
    }
];

export const difficulties = {
    easy: {
        name: 'Kolay',
        timeLimit: 60,
        scorePerCorrect: 100,
        description: 'Belirgin farklılıklar'
    },
    medium: {
        name: 'Orta',
        timeLimit: 45,
        scorePerCorrect: 150,
        description: 'Daha dikkatli bakmalısın'
    },
    hard: {
        name: 'Zor',
        timeLimit: 30,
        scorePerCorrect: 200,
        description: 'Uzman seviyesi'
    }
};

export type { ImageSet } from "../types/index";

export const getRandomImageSet = (difficulty: string | null = null): ImageSet => {
    let availableSets = imageSets;

    if (difficulty) {
        availableSets = imageSets.filter(set => set.difficulty === difficulty);
    }

    if (availableSets.length === 0) {
        availableSets = imageSets;
    }

    const randomSet = availableSets[Math.floor(Math.random() * availableSets.length)];

    // Görselleri karıştır
    const shuffledImages = [...randomSet.images].sort(() => Math.random() - 0.5);

    return {
        ...randomSet,
        images: shuffledImages
    };
};

export const achievements = [
    {
        id: 1,
        name: 'İlk Adım',
        description: 'İlk doğru tahmini yap',
        icon: '',
        requirement: 1
    },
    {
        id: 2,
        name: 'Keskin Göz',
        description: '3 doğru tahmin yap',
        icon: '',
        requirement: 3
    },
    {
        id: 3,
        name: 'AI Dedektörü',
        description: '5 doğru tahmin yap',
        icon: '',
        requirement: 5
    },
    {
        id: 4,
        name: 'Usta',
        description: '10 doğru tahmin yap',
        icon: '',
        requirement: 10
    },
    {
        id: 5,
        name: 'Hız Şampiyonu',
        description: 'Zamana karşı modda kazan',
        icon: '',
        requirement: 1,
        mode: 'timed'
    }
];

