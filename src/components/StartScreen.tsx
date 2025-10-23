import "./StartScreen.css";

interface StartScreenProps {
    onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    return (
        <div className="start-screen">
            <h1 className="title">🎮 AI mı Gerçek mi?</h1>

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

            <button className="start-button" onClick={onStart}>
                Başla 🚀
            </button>
        </div>
    );
}
