console.log = function (...args) {
    if (args[1].type == "FACELETS") {
        const facelets = args[1].facelets;
        console.log(facelets);
    }
}

function reset() {
    console.log('Reset state')
}