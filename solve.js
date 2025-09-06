let moves = [];

function gm() {
    try {
        if (typeof Rubik === 'undefined') {
            throw new Error("Rubik library not loaded!");
        }
        const cube = new Rubik();
        moves.forEach(move => {
            if (cube[move]) {
                cube[move]();
            } else {
                console.warn("Unknown move:", move);
            }
        });
        const solution = cube.solve();
        document.getElementById("solution").textContent = solution;
        navigator.clipboard.writeText(solution)
            .then(() => console.log("Solution copied to clipboard!"))
            .catch(err => console.warn("Copy failed:", err));
        console.log("Solution:", solution);
    } catch (err) {
        console.error("Error:", err);
        alert("Error: " + err.message);
    }
}

window.addEventListener('message', function (event) {
    if (event.data.type === "MOVE") {
        moves.push(event.data.move);
        console.log("Move detected:", event.data.move);
    } else if (event.data === "Reset state") {
        moves = [];
        console.log("Reset state");
    } else if (event.data.type === "Get Moves") {
        gm();
        console.log("Got Moves");
    } else if (event.data === "Connect First") {
        console.log("Connect first");
    }
});

let lastFileContent = '';
function checkForUpdates() {
    fetch('solve.js')
        .then(r => r.text())
        .then(data => {
            if (data !== lastFileContent && data.search('Repl') === -1) {
                lastFileContent = data;
                if (navigator.onLine) {
                    document.getElementById('update').textContent =
                        'Update detected! Refreshing in 2 seconds...';
                    setTimeout(() => location.reload(), 2000);
                }
            }
        })
        .catch(console.error);
}