async function sleep2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(miliseconds) {
    var start = new Date();
    while (start + miliseconds >= new Date().getTime()) {
    }
}

const moves = [];
// Wait for the cube iframe to load
document.getElementById('cube-view').onload = function () {
    // Access the iframe's window
    const iframeWindow = document.getElementById('cube-view').contentWindow;

    const prompt = iframeWindow.prompt;
    const mac = 'AB:12:34:60:7E:DA';
    iframeWindow.prompt = function(...args) {
        console.log(...args)
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
                    moves.push(move);
                    console.log(move);
                }
            }
        }

        function getIframeLogs() {
            return logs;
        }
    }
}

let rmov = ""
let rmoves = moves.reverse()
function send() {
    var r = true
    var t = 1;
    rmoves = moves.reverse()
    if (rmoves.length > 0) {
        rmoves = moves.reverse()
        rmoves.forEach(mov => {
            if (r == true) {
                // Set rmov to mov inverted
                switch (mov) {
                    case "R":
                        rmov = "R'"
                        break;
                    case "R'":
                        rmov = "R"
                        break;
                    case "F":
                        rmov = "F'"
                        break;
                    case "F'":
                        rmov = "F"
                        break;
                    case "L":
                        rmov = "L'"
                        break;
                    case "L'":
                        rmov = "L"
                        break;
                    case "B":
                        rmov = "B'"
                        break;
                    case "B'":
                        rmov = "B"
                        break;
                    case "D":
                        rmov = "D'"
                        break;
                    case "D'":
                        rmov = "D"
                        break
                    case "U":
                        rmov = "U'"
                        break;
                    case "U'":
                        rmov = "U"
                        break
                    default:
                        console.log("Invalid switch / case", rmove, rmoves)
                };
                console.log("Move:", rmov);
                move(rmov);
                t += 1;
                r = false;
            }
            else {
                setTimeout(r = true, 1000);
            }
        });
    }
    else {
        console.warn("No moves")
    }
}

async function move(mov) {
    switch (mov) {
        case "R":
            clr_r()
            break;
        case "R'":
            clr_rp()
            break;
        case "F":
            clr_f()
            break;
        case "F'":
            clr_fp()
            break;
        case "L":
            clr_l()
            break;
        case "L'":
            clr_lp()
            break;
        case "B":
            clr_b()
            break;
        case "B'":
            clr_bp()
            break;
        case "D":
            clr_d()
            break;
        case "D'":
            clr_dp()
            break
        case "U":
            clr_u()
            break;
        case "U'":
            clr_up()
            break
        default:
            console.log("Invalid switch / case", rmove, rmoves)
    }
    sleep(1000)
    await clr_reset();
    console.log("reset");
}

// Colors variables
const clrn = document.getElementById("clr-n"); // Color for the name of the move
const clrm = document.getElementById("clr-m"); // Color for the modifier

function send_signal() {
    clrn.style.background = "yellow"; // SS
    clrm.style.background = "yellow"; // SS
}

// Reset
function clr_reset() {
    clrn.style.background = "black"; // No move
    clrm.style.background = "black"; // No modifier
}
// Right
function clr_r() {
    clrn.style.background = "red"; // Right
    clrm.style.background = "red"; // No modifier
}
function clr_rp() {
    clrn.style.background = "red" // Right
    clrm.style.background = "blue" // Modifier (prime ')
}
// Front
function clr_f() {
    clrn.style.background = "blue"; // Front
    clrm.style.background = "red"; // No modifier
}
function clr_fp() {
    clrn.style.background = "blue" // Front
    clrm.style.background = "blue" // Modifier (prime ')
}
// Left
function clr_l() {
    clrn.style.background = "green"; // Left
    clrm.style.background = "red"; // No modifier
}
function clr_lp() {
    clrn.style.background = "green" // Left
    clrm.style.background = "blue" // Modifier (prime ')
}
// Back
function clr_b() {
    clrn.style.background = "yellow"; // Back
    clrm.style.background = "red"; // No modifier
}
function clr_bp() {
    clrn.style.background = "yellow" // Back
    clrm.style.background = "blue" // Modifier (prime ')
}
// Down
function clr_d() {
    clrn.style.background = "pink"; // Down
    clrm.style.background = "red"; // No modifier
}
function clr_dp() {
    clrn.style.background = "pink" // Down
    clrm.style.background = "blue" // Modifier (prime ')
}
// Up
function clr_u() {
    clrn.style.background = "brown"; // Up
    clrm.style.background = "red"; // No modifier
}
function clr_up() {
    clrn.style.background = "brown" // Up
    clrm.style.background = "blue" // Modifier (prime ')
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