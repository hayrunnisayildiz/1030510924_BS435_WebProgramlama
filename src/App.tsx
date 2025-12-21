import { useState, useEffect, useCallback } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import BackgroundSelector from "./components/BackgroundSelector";
import { getRandomImageSet, difficulties } from "./data/imageData";
import type { Image, ImageSet } from "./types/index";

type GameScreenType = "start" | "game" | "result";

function App() {
    const [screen, setScreen] = useState<GameScreenType>("start");
    const [gameMode, setGameMode] = useState<string>("normal");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [round, setRound] = useState(1);
    const [currentImageSet, setCurrentImageSet] = useState<ImageSet | null>(null);
    const [hasUsedHint, setHasUsedHint] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#ffc0cb");

    // Sayfa yüklendiğinde kaydedilmiş arka plan rengini uygula
    useEffect(() => {
        const savedColor = localStorage.getItem("background-color");
        if (savedColor) {
            setBackgroundColor(savedColor);
            document.body.style.backgroundColor = savedColor;
        }
    }, []);

    const handleTimeUp = useCallback(() => {
        if (screen === "game") {
            setIsCorrect(false);
            setWrongAnswers(prev => prev + 1);
            setScreen("result");
        }
    }, [screen]);

    // Zaman yarışı modu için timer
    useEffect(() => {
        if (screen === "game" && gameMode === "timed" && timeLeft !== null && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (screen === "game" && gameMode === "timed" && timeLeft === 0) {
            // Zaman doldu, yanlış sayılır
            handleTimeUp();
        }
    }, [screen, gameMode, timeLeft, handleTimeUp]);

    const handleStart = (mode: string) => {
        setGameMode(mode);
        setScreen("game");
        setScore(0);
        setLives(3);
        setRound(1);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        setIsGameOver(false);
        startNewRound();
    };

    const startNewRound = () => {
        const imageSet = getRandomImageSet();
        setCurrentImageSet(imageSet);
        setHasUsedHint(false);
        
        // Zaman yarışı modu için zaman limiti ayarla
        if (gameMode === "timed") {
            const difficulty = difficulties[imageSet.difficulty as keyof typeof difficulties];
            setTimeLeft(difficulty.timeLimit);
        } else {
            setTimeLeft(null);
        }
    };

    const handleImageSubmit = (imageId: string) => {
        if (!currentImageSet) return;

        const selectedImage = currentImageSet.images.find((img: Image) => img.id === imageId);
        const isCorrectAnswer = selectedImage?.isAI === true;

        if (isCorrectAnswer) {
            // Doğru cevap
            setIsCorrect(true);
            setCorrectAnswers(correctAnswers + 1);
            
            // Puan hesapla
            const difficulty = difficulties[currentImageSet.difficulty as keyof typeof difficulties];
            let pointsEarned = difficulty.scorePerCorrect;
            
            // İpucu kullanıldıysa puan azalt
            if (hasUsedHint) {
                pointsEarned = Math.floor(pointsEarned * 0.7);
            }
            
            // Zaman yarışı modunda kalan süreye göre bonus
            if (gameMode === "timed" && timeLeft !== null) {
                const timeBonus = Math.floor(timeLeft * 2);
                pointsEarned += timeBonus;
            }
            
            setScore(score + pointsEarned);
            setScreen("result");
            } else {
                // Yanlış cevap - ikinci şans kontrolü
                if (!hasUsedHint) {
                    // İlk yanlış seçim, ipucu göster ve ikinci şans ver
                    setHasUsedHint(true);
                    // GameScreen'de ipucu gösterilecek
                } else {
                // İkinci şans da yanlış
                setIsCorrect(false);
                setWrongAnswers(wrongAnswers + 1);
                
                if (gameMode === "normal") {
                    const newLives = lives - 1;
                    setLives(newLives);
                    
                    if (newLives <= 0) {
                        // Oyun bitti
                        setIsGameOver(true);
                    }
                }
                setScreen("result");
            }
        }
    };


    const handleNextRound = () => {
        if (isGameOver) {
            // Oyun bitti, baştan başla
            handleRestart();
        } else {
            setRound(round + 1);
            startNewRound();
            setScreen("game");
        }
    };

    const handleRestart = () => {
        setScreen("start");
        setScore(0);
        setLives(3);
        setRound(1);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        setCurrentImageSet(null);
        setHasUsedHint(false);
        setTimeLeft(null);
        setIsGameOver(false);
    };

    const getCorrectAnswerName = (): string => {
        if (!currentImageSet) return "";
        const aiImage = currentImageSet.images.find((img: Image) => img.isAI);
        return aiImage?.category || "AI Görsel";
    };

    return (
        <div className="app" style={{ backgroundColor }}>
            <BackgroundSelector onColorChange={setBackgroundColor} />
            
            {screen === "start" && <StartScreen onStart={handleStart} />}
            
            {screen === "game" && currentImageSet && (
                <GameScreen
                    images={currentImageSet.images}
                    onSubmit={handleImageSubmit}
                    round={round}
                    score={score}
                    difficulty={difficulties[currentImageSet.difficulty as keyof typeof difficulties].name}
                    lives={gameMode === "normal" ? lives : undefined}
                    timeLeft={gameMode === "timed" ? timeLeft : undefined}
                    hasUsedHint={hasUsedHint}
                />
            )}
            
            {screen === "result" && (
                <ResultScreen
                    isCorrect={isCorrect}
                    score={score}
                    round={round}
                    correctAnswer={getCorrectAnswerName()}
                    onNextRound={handleNextRound}
                    onRestart={handleRestart}
                    gameMode={gameMode === "normal" ? "Normal Mod" : "Zaman Yarışı"}
                    isGameOver={isGameOver}
                    correctAnswers={correctAnswers}
                    wrongAnswers={wrongAnswers}
                    lives={gameMode === "normal" ? lives : undefined}
                />
            )}
        </div>
    );
}

export default App;
