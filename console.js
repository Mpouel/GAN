import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

if (localStorage.getItem('sharedConsole') == 'server') {
    const peer = new Peer('ganrobotconsole');
} else if (localStorage.getItem('sharedConsole') == 'true') {
    const peer = new Peer();
}

peer.on('open', (id) => {
    console.log('open')
    // Connect to another peer

    if (localStorage.getItem('sharedConsole') == 'server') {

        conn.on('data', (data) => {
            handleCommand(data, conn);
        });

        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                handleCommand(data, conn);
            });
        });
    } else if (localStorage.getItem('sharedConsole') == 'client') {
        const peerId = 'ganrobotconsole';
        const conn = peer.connect(peerId);

        conn.on('open', () => {
            displayMessage('Connected to peer: ' + peerId, 'log');
            conn.send('Connected to console sharing');
        });
        function compute(...args) {
            var ret = []
            args.forEach(element => {
                if (typeof element === "string") {
                    var content = {
                        strings: element
                    };
                }
                if (typeof element === "number") {
                    var content = {
                        numbers: element
                    };
                }
                if (Array.isArray(element)) {
                    var content = {
                        arrays: element
                    };
                }
                ret.push(content)
            });
            return ret
        }
        console.log = function (...args) {
            args.forEach(element => {
                conn.send(element)
            });
        }
        conn.on('data', (data) => {
            handleCommand(data, conn);
        });
    }
}

    function displayMessage(message, type) {

        // Log to console based on type
        if (type === 'log') {
            console.log(message);
        } else if (type === 'error') {
            console.error(message);
        }
    }
});
