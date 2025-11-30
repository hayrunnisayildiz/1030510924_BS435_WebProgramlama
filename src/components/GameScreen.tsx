import { useState, useEffect } from "react";
import type { Image as ImageType } from "../types/index";
import "./GameScreen.css";

interface GameScreenProps {
    images: ImageType[];
    onSubmit: (selectedImageId: string) => void;
    round: number;
    score: number;
    difficulty: string;
    lives?: number;
    timeLeft?: number | null;
    hasUsedHint: boolean;
}

export default function GameScreen({
    images,
    onSubmit,
    round,
    score,
    difficulty,
    lives,
    timeLeft,
    hasUsedHint
}: GameScreenProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(hasUsedHint);

    // hasUsedHint değiştiğinde ipucuyu göster
    useEffect(() => {
        if (hasUsedHint) {
            setShowHint(true);
        }
    }, [hasUsedHint]);

    const handleImageClick = (imageId: string) => {
        setSelected(imageId);
    };

    const handleSubmit = () => {
        if (selected) {
            onSubmit(selected);
        }
    };

    const handleShowHint = () => {
        setShowHint(true);
    };

    const aiImage = images.find((img) => img.isAI);

    // Zaman formatı
    const formatTime = (seconds: number | null | undefined) => {
        if (seconds === null || seconds === undefined) return "";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="game-screen">
            <div className="game-header">
                <div className="game-info">
                    <h2>Tur {round}</h2>
                    <p>Puan: {score}</p>
                    {lives !== undefined && (
                        <p className="lives-info">Can: {lives}</p>
                    )}
                    {timeLeft !== null && timeLeft !== undefined && timeLeft > 0 && (
                        <p className={`time-info ${timeLeft <= 10 ? "time-warning" : ""}`}>
                            Zaman: {formatTime(timeLeft)}
                        </p>
                    )}
                </div>
                <div className="difficulty-badge">{difficulty}</div>
            </div>

            <div className="game-instruction">
                <h3>Hangi görsel AI tarafından oluşturulmuştur?</h3>
                <p>3 görselden birini seç</p>
                {hasUsedHint && (
                    <p className="second-chance-notice">
                        İkinci şansın! Daha dikkatli seç.
                    </p>
                )}
            </div>

            {showHint && aiImage?.hint && (
                <div className="hint-box">
                    <strong>İpucu:</strong> {aiImage.hint}
                </div>
            )}

            <div className="images-container">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`image-card ${selected === image.id ? "selected" : ""}`}
                        onClick={() => handleImageClick(image.id)}
                    >
                        <img
                            src={image.url}
                            alt={`Görsel ${image.id}`}
                            className="game-image"
                        />
                        {selected === image.id && (
                            <div className="selection-overlay">Secildi</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="game-actions">
                {!showHint && (
                    <button className="hint-btn" onClick={handleShowHint}>
                        İpucu Al
                    </button>
                )}
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={!selected || (timeLeft !== null && timeLeft !== undefined && timeLeft <= 0)}
                >
                    Gönder
                </button>
            </div>
        </div>
    );
}