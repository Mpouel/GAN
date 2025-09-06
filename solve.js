import cubejs from "https://cdn.jsdelivr.net/npm/cubejs/lib/cube.min.js";

let moves = [];

async function solve(scramble) {
    cubejs.initSolver();
    const cube = cubejs();
    cube.move(scramble);
    const solution = cube.solve(); 
    return solution || "caca";
}

function gm() {
    try {
        const solution = solve(moves);
        navigator.clipboard.writeText(solution)
        console.log("Got moves: \n" + solution)
      } catch (err) {
        console.error(err);
      }
}

const iframeWindow = document.getElementById('cube-view').contentWindow;
document.getElementById('cube-view').onload = function () {
    const prompt = iframeWindow.prompt;
    const mac = 'AB:12:34:60:7E:DA';
    iframeWindow.prompt = function (...args) {
        console.log(args);
        return mac
    };

    if (iframeWindow) {
        const originalLog = iframeWindow.console.log;
        const logs = [];
        iframeWindow.console.log = function (...args) {
            logs.push(args);
            if (args[1] != undefined) {
                if (args[1].type == "MOVE") {
                    const move = args[1].move;
                    console.log(move)
                    moves.push(move);
                }
            }
            else if (args == "Reset state") {
                moves.length = 0;
                console.log("Reset state");
                // solved() // for after
            }
        }

        function getIframeLogs() {
            return logs;
        }
    }
}

// Auto-refresh on update
function checkFileContent(filePath, specificContent, callbackIfContentNotSameFalse) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            let isContentSame = (data === specificContent);
            if (isContentSame || data.search('Repl') != -1) { } else {
                callbackIfContentNotSameFalse()
            }
        })
        .catch(error => console.error('Error:', error));
}
function betterFetch(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            callback(data)
        })
        .catch(error => console.error('Error:', error));
}
function needUpdateMessage() {
    document.getElementById('update').classList.add('update')
    document.getElementById('update').innerText = 'New update detected ! Refreshing Page...'
    setTimeout(() => {
        var rel = () => {
            location.reload()
        }
        checkOnlineStatus(rel)
    }, 2000)
}
function checkOnlineStatus(callback) {
    if (navigator.onLine) {
        console.log("User is online, executing the function");
        callback();
    } else {
        document.getElementById('update').innerText = 'New update detected waiting for internet connection...'
        setTimeout(checkOnlineStatus, 5000); // Wait for 5 seconds and then check the online status again
    }
}
betterFetch('solve.js', (data) => {
    window.data1 = data
    setInterval(() => {
        checkFileContent('solve.js', window.data1, (data) => {
            if (!navigator.onLine) {
                return
            }
            needUpdateMessage()
        });
    }, 5000)
})