import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

var peer = "lol"
if (localStorage.getItem('sharedConsole') == 'server') {
    var peer = new Peer('ganrobotconsole');
} else if (localStorage.getItem('sharedConsole') == 'client') {
    var peer = new Peer();
}

peer.on('open', (id) => {
    if (localStorage.getItem('sharedConsole') == 'server') {
        console.log('open as server')
        peer.on('connection', (conn) => {
            console.log('got a connection')
            conn.on('data', (data) => {
                console.log(data)
            });
        });
    } else if (localStorage.getItem('sharedConsole') == 'client') {
        console.log('open as client')
        const peerId = 'ganrobotconsole';
        const conn = peer.connect(peerId);

        conn.on('open', () => {
            console.log('connected to server')
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
        var oldlog = console.log
        console.log = function (...args) {
            args.forEach(element => {
                conn.send(compute(element))
            });
            oldlog(args)
        }
        var olderror = console.error
        console.error = function (...args) {
            conn.send(args.toString())
            olderror(error)
        }
        conn.on('data', (data) => {
            displayMessage(message)
        });
    }

    function displayMessage(message, type) {

        // Log to console based on type
        if (type == 'log') {
            console.log(message);
        } else if (type == 'error') {
            console.error(message);
        }
    }
});