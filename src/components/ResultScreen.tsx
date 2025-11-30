import "./ResultScreen.css";

interface ResultScreenProps {
    isCorrect: boolean;
    score: number;
    round: number;
    correctAnswer: string;
    onNextRound: () => void;
    onRestart: () => void;
    gameMode: string;
    isGameOver?: boolean;
    correctAnswers?: number;
    wrongAnswers?: number;
    lives?: number;
}

export default function ResultScreen({
    isCorrect,
    score,
    round,
    correctAnswer,
    onNextRound,
    onRestart,
    gameMode,
    isGameOver = false,
    correctAnswers = 0,
    wrongAnswers = 0,
    lives
}: ResultScreenProps) {
    return (
        <div className="result-screen">
            <div className={`result-card ${isCorrect ? "success" : "failure"}`}>
                <div className="result-icon">
                    {isGameOver ? "Oyun Bitti" : isCorrect ? "Basarili" : "Basarisiz"}
                </div>
                <h2 className="result-title">
                    {isGameOver
                        ? "Oyun Bitti!"
                        : isCorrect
                        ? "Tebrikler! Doğru Tahmin!"
                        : "Yanlış Tahmin"}
                </h2>
                <p className="result-message">
                    {isGameOver
                        ? `Tüm canların bitti! Toplam ${correctAnswers} doğru, ${wrongAnswers} yanlış tahmin yaptın.`
                        : isCorrect
                        ? "Harika bir iş çıkardın! AI görselini başarıyla tespit ettin."
                        : `Maalesef yanlış seçim yaptın. Doğru cevap: ${correctAnswer}`}
                </p>

                <div className="result-stats">
                    <div className="stat-item">
                        <span className="stat-label">Mevcut Puan:</span>
                        <span className="stat-value">{score}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Tur:</span>
                        <span className="stat-value">{round}</span>
                    </div>
                    {lives !== undefined && (
                        <div className="stat-item">
                            <span className="stat-label">Kalan Can:</span>
                            <span className="stat-value">{lives}</span>
                        </div>
                    )}
                    <div className="stat-item">
                        <span className="stat-label">Doğru:</span>
                        <span className="stat-value">{correctAnswers}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Yanlış:</span>
                        <span className="stat-value">{wrongAnswers}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Mod:</span>
                        <span className="stat-value">{gameMode}</span>
                    </div>
                </div>

                <div className="result-actions">
                    {!isGameOver && (
                        <button className="next-round-btn" onClick={onNextRound}>
                            Sonraki Tur
                        </button>
                    )}
                    <button className="restart-btn" onClick={onRestart}>
                        {isGameOver ? "Yeniden Başla" : "Ana Menü"}
                    </button>
                </div>
            </div>
        </div>
    );
}

