// Import the PeerJS library for peer-to-peer communication
import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

// Default peer configuration
let peer = "No peer";
let peerId = "ganrobotconsole";
const params = new URLSearchParams(document.location.search);
let prPeerId = params.get("peerid");

// Override peerId if specified in the URL query parameters
if (params.has("peerid")) {
    peerId = prPeerId;
}

// Determine peer type (server/client) from URL or local storage
if (params.has("type")) {
    peer = params.get("type") === "server" ? new Peer(peerId) : new Peer();
} else {
    const storedType = localStorage.getItem("sharedConsole");
    peer = storedType === "server" ? new Peer(peerId) : new Peer();
}

// Backup default console methods for later use
const oldLog = console.log;
const oldError = console.error;

// Event triggered when the peer connection is established
peer.on("open", (id) => {
    console.log("Peer connection open");

    // Server behavior
    if ((localStorage.getItem("sharedConsole") === "server" || params.get("type") === "server") && params.get("type") !== "client") {
        peer.on("connection", (conn) => {
            conn.on("data", (data) => {
                if (Array.isArray(data)) {
                    const content = data[0];
                    let message;
                    
                    if (content.numbers !== undefined) message = content.numbers;
                    if (content.strings !== undefined) message = content.strings;
                    if (content.arrays !== undefined) message = content.arrays;

                    console.log(message);
                } else if (data == prPeerId) {
                    console.log("Connected as server to peer: " + prPeerId);
                } else {
                    console.error(data);
                }
            });
        });
    }
    // Client behavior
    else if ((localStorage.getItem("sharedConsole") === "client" || params.get("type") === "client") && params.get("type") !== "server") {
        const conn = peer.connect(peerId);

        conn.on("open", () => {
            displayMessage("Connected as client to peer: ${peerId}", "log");
            conn.send(peerId);
        });

        // Function to format data for transmission
        function compute(...args) {
            return args.map((element) => {
                if (typeof element === "string") return { strings: element };
                if (typeof element === "number") return { numbers: element };
                if (Array.isArray(element)) return { arrays: element };
                return null;
            }).filter(Boolean);
        }

        // Override console methods to handle peer communication
        console.log = function (...args) {
            displayMessage(args, "log");
            args.forEach((element) => conn.send(compute(element)));
        };

        console.error = function (...args) {
            displayMessage(args, "error");
            conn.send(args.toString());
        };

        conn.on("data", (data) => {
            displayMessage(data, "log");
        });
    }

    // Helper function to display messages based on type
    function displayMessage(message, type) {
        if (type === "log") {
            oldLog(message);
        } else if (type === "error") {
            oldError(message);
        } else {
            oldLog(message);
        }
    }
});

// Destroy peer on window close
window.onbeforeunload = () => {
    peer.destroy();
};
