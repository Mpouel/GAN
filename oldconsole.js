// https://prod.liveshare.vsengsaas.visualstudio.com/join?BA39A58F31D67437D45A1273BD8FA40F968E
import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

var peer = "No peer"
var peerId = 'ganrobotconsole';
var params = new URLSearchParams(document.location.search);

if (params.has("peerid")) {
    var peerId = params.get("peerid")
}
if (params.has("type")) {
    if (params.get('type') == 'server') {
        var peer = new Peer(peerId);
    } else if (params.get('type') == 'client') {
        var peer = new Peer();
    }
} else {
    if (localStorage.getItem('sharedConsole') == 'server') {
        var peer = new Peer(peerId);
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
                if (Array.isArray(data)) {
                    var content = data[0]
                    if (content.numbers != undefined) {
                        var string = content.numbers
                    }
                    if (content.strings != undefined) {
                        var string = content.strings
                    }
                    if (content.arrays != undefined) {
                        var string = content.arrays
                    }
                    console.log(string)
                } else if (!content == "Connected as server to console sharing") {    
                    console.error(data);
                } else {
                    console.log("Connected as server to console sharing")
                }
            });
        });
    } else if ((localStorage.getItem('sharedConsole') == 'client' || params.get('type') == 'client') && params.get('type') != 'server') {
        const conn = peer.connect(peerId);

        conn.on('open', () => {
            displayMessage('Connected as client to peer: ' + peerId, 'log');
            conn.send('Connected as server to console sharing');
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
            displayMessage(args, 'log')
            args.forEach(element => {
                conn.send(compute(element))
            });
        }
        console.error = function (...args) {
            displayMessage(args, 'error')
            conn.send(args.toString())
        }
        conn.on('data', (data) => {
            displayMessage(data, "log")
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

window.onbeforeunload = function ()  {peer.destroy()}