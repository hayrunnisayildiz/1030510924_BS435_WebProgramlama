import { useState } from "react";
import "./StartScreen.css";

interface StartScreenProps {
    onStart: (gameMode: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    const [selectedMode, setSelectedMode] = useState<string>("normal");

    const gameModes = [
        {
            id: "normal",
            name: "Normal Mod",
            description: "Klasik oyun modu. 3 can hakkın var. Yanlış seçimde ipucu alabilirsin.",
            icon: ""
        },
        {
            id: "timed",
            name: "Zaman Yarışı",
            description: "Her tur için zaman limiti var! Hızlı düşün ve doğru tahmin yap.",
            icon: ""
        }
    ];

    return (
        <div className="start-screen">
            <h1 className="title">AI mi Gerçek mi?</h1>

            <div className="intro">
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

            <div className="mode-selection">
                <h3>Oyun Modunu Seç:</h3>
                <div className="mode-cards">
                    {gameModes.map((mode) => (
                        <div
                            key={mode.id}
                            className={`mode-card ${selectedMode === mode.id ? "selected" : ""}`}
                            onClick={() => setSelectedMode(mode.id)}
                        >
                            <div className="mode-icon">{mode.icon}</div>
                            <h4>{mode.name}</h4>
                            <p>{mode.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="start-button"
                onClick={() => onStart(selectedMode)}
            >
                Başla
            </button>
        </div>
    );
}
