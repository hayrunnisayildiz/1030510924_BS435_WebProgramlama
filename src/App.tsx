import { useState } from "react";
import StartScreen from "./components/StartScreen";

function App() {
    const [started, setStarted] = useState(false);

    return (
        <div>
            {!started ? (
                <StartScreen onStart={() => setStarted(true)} />
            ) : (
                <h2>Oyun başladı! (Sonraki ekran burada olacak)</h2>
            )}
        </div>
    );
}

export default App;
