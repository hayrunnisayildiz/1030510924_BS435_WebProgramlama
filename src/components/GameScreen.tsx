import { useState, useEffect } from "react";
import { Image as ImageType } from "../types/index";
import "./GameScreen.css";

interface GameScreenProps {
    images: ImageType[];
    onSubmit: (selectedImageId: string) => void;
    round: number;
    score: number;
    difficulty: string;
}

export default function GameScreen({
                                       images,
                                       onSubmit,
                                       round,
                                       score,
                                       difficulty
                                   }: GameScreenProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);

    const handleImageClick = (imageId: string) => {
        setSelected(imageId);
    };

    const handleSubmit = () => {
        if (selected) {
            onSubmit(selected);
            setSelected(null);
            setShowHint(false);
        }
    };

    const handleShowHint = () => {
        setShowHint(true);
    };

    const aiImage = images.find((img) => img.isAI);

    return (
        <div className="game-screen">
            <div className="game-header">
                <div className="game-info">
                    <h2>Tur {round}</h2>
                    <p>Puan: {score}</p>
                </div>
                <div className="difficulty-badge">{difficulty}</div>
            </div>

            <div className="game-instruction">
                <h3>Hangi görsel AI tarafından oluşturulmuştur?</h3>
                <p>3 görselden birini seç</p>
            </div>

            {showHint && aiImage?.hint && (
                <div className="hint-box">
                    💡 <strong>İpucu:</strong> {aiImage.hint}
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
                            <div className="selection-overlay">✓</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="game-actions">
                {!showHint && (
                    <button className="hint-btn" onClick={handleShowHint}>
                        💡 İpucu Al
                    </button>
                )}
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={!selected}
                >
                    Gönder
                </button>
            </div>
        </div>
    );
}