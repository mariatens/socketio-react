import { useState } from "react";
import SocketIODemo from "./SocketIODemo";

import "./App.css";
import { Placeholder } from "./Placeholder";

function App() {
    const [showDemo, setShowDemo] = useState(true);
    return (
        <div className="App">
            {showDemo ? <SocketIODemo /> : <Placeholder />}

            <button onClick={() => setShowDemo((v) => !v)}>
                Toggle Show Demo
            </button>
        </div>
    );
}

export default App;


