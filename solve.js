async function sleep2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(miliseconds) {
    var start = new Date();
    while (start + miliseconds >= new Date().getTime()) {
    }
}

var moves = [];
const iframeWindow = document.getElementById('cube-view').contentWindow;
// Wait for the cube iframe to load
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
        iframeWindow.handleFaceletsEvent = function (...args) {
            console.log(args)
        }
        iframeWindow.console.log = function (...args) {
            logs.push(args);
            if (args[1] != undefined) {
                if (args[1].type == "MOVE") {
                    const move = args[1].move;
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

function server() {
    localStorage.setItem('sharedConsole', "server")
}
function client() {
    localStorage.setItem('sharedConsole', "client")
}