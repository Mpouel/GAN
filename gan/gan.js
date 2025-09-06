function gm() {
    if (document.getElementById("connect").innerHTML === "Disconnect") {
        console.log('Get Moves');
    } else {
        console.log('Connect first');
    }
}

function reset() {
    if (document.getElementById("connect").innerHTML === "Disconnect") {
        console.log('Reset state');
    } else {
        console.log('Connect first');
    }
}