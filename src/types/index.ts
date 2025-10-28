// Görsel tipi
export interface Image {
    id: string;
    url: string;
    isAI: boolean;
    category: string;
    hint?: string;
}

// Görsel seti tipi
export interface ImageSet {
    id: number;
    difficulty: string;
    images: Image[];
}

// Oyun durumu tipi
export interface GameState {
    screen: 'start' | 'game' | 'result';
    score: number;
    lives: number;
    currentRound: number;
    selectedImage: string | null;
    showHint: boolean;
    hasUsedHint: boolean;
    showResult: boolean;
    correctAnswers: number;
    wrongAnswers: number;
}