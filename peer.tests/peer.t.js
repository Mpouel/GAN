import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

var peer = new Peer();
var conn = peer.connect('dest-peer-id');
var id = "robot peer tests"
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
    peer.on('connection', (conn) => {
        console.log('got a connection')
        conn.on('data', (data) => {
            console.log(data)
        });
    });
    
});