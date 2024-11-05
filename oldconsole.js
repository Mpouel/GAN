import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

var peer = "lol";
var params = new URLSearchParams(document.location.search);
    
if (params.has("type")) {
    if (params.get('type') == 'server') {
        var peer = new Peer('ganrobotconsole');
    } else if (params.get('type') == 'client') {
        var peer = new Peer();
    }
} else {
    if (localStorage.getItem('sharedConsole') == 'server') {
        var peer = new Peer('ganrobotconsole');
    } else if (localStorage.getItem('sharedConsole') == 'client') {
        var peer = new Peer();
    }
}
var oldlog = console.log
var olderror = console.error
  
peer.on('open', (id) => {
    console.log('open')
    // Connect to another peer
    if ((localStorage.getItem('sharedConsole') == 'server' || params.get('type') == 'server') && params.get('type') != 'client') {
        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                console.log(data.toString())
            });
        });
    } else if ((localStorage.getItem('sharedConsole') == 'client' || params.get('type') == 'client') && params.get('type') != 'server') {
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
            displayMessage(args,'log')
            args.forEach(element => {
                conn.send(compute(element))
            });
        }
        console.error = function (...args) {
            displayMessage(args,'error')
            conn.send(args.toString())
        }
        conn.on('data', (data) => {
            displayMessage(message)
        });
    }

    function displayMessage(message, type) {
        // Log to client console based on type
        if (type === 'log') {
            oldlog(message);
        } else if (type === 'error') {
            olderror(message);
        } else {
          oldlog(message)
        }
    }
});
