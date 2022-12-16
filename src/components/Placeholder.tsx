export function Placeholder() {
    return (
        <div>
            <p>SocketIO Demo component is not mounted. </p>
            <p>
                Try sending socketio messages to it now and making sure there
                are no errors in the console: If it's been set up correctly, it
                should have been disconnected and any listeners should have been
                deregistered.
            </p>
            <p><img src="https://picsum.photos/800/200" /></p>
        </div>
    );
}
