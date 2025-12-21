import { useState } from "react";
import "./StartScreen.css";

interface StartScreenProps {
    onStart: (gameMode: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const gameModes = [
        {
            id: "normal",
            name: "Normal Mod",
            displayName: "🎮 Normal Mod",
            description: "Klasik oyun modu. 3 can hakkın var. Yanlış seçimde ipucu alabilirsin.",
            icon: "🎮",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: "timed",
            name: "Zaman Yarışı",
            displayName: "⏱️ Zaman Yarışı",
            description: "Her tur için zaman limiti var! Hızlı düşün ve doğru tahmin yap.",
            icon: "⏱️",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        }
    ];

    return (
        <div className="start-screen">
            <h1 className="title">AI mi Gerçek mi?</h1>

            <button 
                className="info-button"
                onClick={() => setShowInfo(true)}
            >
                ℹ️ Oyun Hakkında
            </button>

            {showInfo && (
                <>
                    <div className="info-overlay" onClick={() => setShowInfo(false)} />
                    <div className="info-panel">
                        <div className="info-panel-header">
                            <h2>Oyun Hakkında</h2>
                            <button 
                                className="close-info-btn"
                                onClick={() => setShowInfo(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="info-content">
                            <p>
                                Bu oyunda sana aynı anda <strong>3 farklı görsel</strong> gösterilecek.
                                Bunlardan <strong>ikisi gerçek</strong>, biri ise{" "}
                                <strong>yapay zekâ</strong> tarafından üretilmiş olacak.
                            </p>

                            <p>
                                Amacın, hangi görselin yapay zekâ tarafından üretildiğini bulmak!
                            </p>

                            <h3>Kurallar:</h3>
                            <ul>
                                <li>Her turda 3 görsel arasından bir seçim yap.</li>
                                <li>Yanlış seçersen ipucu alabilir ve ikinci şans elde edersin.</li>
                                <li>Doğru tahmin yaparsan puan kazanırsın!</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}

            <div className="mode-selection">
                <h3>Oyun Modunu Seç:</h3>
                <div className="mode-cards">
                    {gameModes.map((mode) => (
                        <div
                            key={mode.id}
                            className={`mode-card ${selectedMode === mode.id ? "selected" : ""} mode-${mode.id}`}
                            onClick={() => setSelectedMode(mode.id)}
                        >
                            <div className="mode-icon">
                                {mode.icon}
                            </div>
                            <h4 className="mode-title">{mode.displayName}</h4>
                            <p>{mode.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="start-button"
                onClick={() => selectedMode && onStart(selectedMode)}
                disabled={!selectedMode}
            >
                Başla
            </button>
        </div>
    );
}
