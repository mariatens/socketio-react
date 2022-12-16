import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

//TODO: Better to put this in a build variable, NOT in code.
const serverBase: string =
    process.env.NODE_ENV === "production"
        ? "https://myfakeserver.heroku.app"
        : "http://localhost:4000";

function SocketIODemo(): JSX.Element {
    const [socket, setSocket] = useState<Socket>(null!);

    const [storyWords, setStoryWords] = useState<string[]>([]);
    const [textField, setTextField] = useState<string>("");

    function handleReceivedStoryUpdate(words: string[]) {
        setStoryWords(words);
    }

    useEffect(() => {
        console.log("making connection");
        const newSocket: Socket = io(serverBase);
        console.log("made connection");

        //store the socket
        setSocket(newSocket);

        //optionally register generic listeners
        newSocket.prependAnyOutgoing((...args) => {
            console.log("socketio outgoing: ", args);
        });

        newSocket.prependAny((...args) => {
            console.log("socketio incoming: ", args);
        });

        //optionally register message-specific listeners
        newSocket.on("storyUpdate", handleReceivedStoryUpdate);

        function cleanupSocketIO() {
            console.log(
                "disconnecting from socket.io server, deregistering listeners"
            );
            newSocket.removeAllListeners();
            newSocket.disconnect();
        }
        return cleanupSocketIO;
    }, []);

    function handleAddWordClicked() {
        socket.emit("addWord", textField);
        setTextField("");
    }

    return (
        <div>
            <h1>SocketIO Demo</h1>
            <div className="controls">
                <input
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddWordClicked();
                        }
                    }}
                />
                <button onClick={handleAddWordClicked}>Add word</button>
                <button onClick={() => socket.emit("clearStory")}>
                    Clear story
                </button>
            </div>

            <div className="story">
                {storyWords.map((w, ix) => (
                    <div className="storyWord" key={ix}>
                        {w}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SocketIODemo;
