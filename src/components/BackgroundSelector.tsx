import { useState, useEffect } from "react";
import "./BackgroundSelector.css";

interface BackgroundSelectorProps {
    onColorChange: (color: string) => void;
}

const colorOptions = [
    { name: "Pembe", value: "#ffc0cb" },
    { name: "Mavi", value: "#add8e6" },
    { name: "Yeşil", value: "#90ee90" },
    { name: "Sarı", value: "#ffffe0" },
    { name: "Turuncu", value: "#ffdab9" },
    { name: "Mor", value: "#dda0dd" },
    { name: "Açık Gri", value: "#f5f5f5" },
    { name: "Beyaz", value: "#ffffff" },
    { name: "Lavanta", value: "#e6e6fa" },
    { name: "Mint", value: "#f0fff0" },
    { name: "Şeftali", value: "#ffe4b5" },
    { name: "Açık Mavi", value: "#e0f6ff" }
];

export default function BackgroundSelector({ onColorChange }: BackgroundSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(() => {
        const saved = localStorage.getItem("background-color");
        return saved || "#ffc0cb";
    });

    useEffect(() => {
        // Sayfa yüklendiğinde kaydedilmiş rengi uygula
        document.documentElement.style.setProperty("--bg-color", selectedColor);
        document.body.style.backgroundColor = selectedColor;
        onColorChange(selectedColor);
    }, []);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        localStorage.setItem("background-color", color);
        document.documentElement.style.setProperty("--bg-color", color);
        document.body.style.backgroundColor = color;
        onColorChange(color);
        setIsOpen(false);
    };

    return (
        <div className="background-selector">
            <button
                className="background-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Arka Plan Rengi Seç"
            >
                🎨
            </button>
            
            {isOpen && (
                <>
                    <div className="background-overlay" onClick={() => setIsOpen(false)} />
                    <div className="background-panel">
                        <div className="background-panel-header">
                            <h3>Arka Plan Rengi Seç</h3>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                        </div>
                        <div className="color-grid">
                            {colorOptions.map((color) => (
                                <div
                                    key={color.value}
                                    className={`color-option ${selectedColor === color.value ? "selected" : ""}`}
                                    onClick={() => handleColorSelect(color.value)}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                >
                                    {selectedColor === color.value && <span className="check-mark">✓</span>}
                                </div>
                            ))}
                        </div>
                        <div className="custom-color-section">
                            <label htmlFor="custom-color">Özel Renk:</label>
                            <input
                                id="custom-color"
                                type="color"
                                value={selectedColor}
                                onChange={(e) => handleColorSelect(e.target.value)}
                                className="custom-color-input"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
