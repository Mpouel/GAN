// Copy mac adress
function copy_mac() {
    var mac = document.getElementById("mac")
    mac.select();
    mac.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(mac.innerText);
}

// Wait for the cube iframe to load
document.getElementById('cube-view').onload = function () {
    // Access the iframe's window
    const iframeWindow = document.getElementById('cube-view').contentWindow;

    // Check if it's the same origin
    if (iframeWindow) {
        // Store the original console.log function
        const originalLog = iframeWindow.console.log;
        // Create an array to store logs
        const logs = [];
        // Override console.log
        iframeWindow.console.log = function (...args) {
            // Push the logs to the array
            logs.push(args);
            if (args[1] != undefined) {
                if (args[1].type == "MOVE") {
                    // Set the move var
                    let move = args[1].move;
                    // Log the actual move
                    console.log(move);
                    // Set the move switch to false
                    er = 1;
                    // Switch to send the move to EV3
                    switch (move) {
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
                            er = 0
                    }
                    // Clear colors
                    if (er == 1) {setTimeout(clr_reset, 2000)}
                    // Move switch error
                    else {console.error("Move switch error :(")}
                }
            }
        }

        // Function to get the captured logs
        function getIframeLogs() {
            return logs;
        }

        // Example usage: Print logs after 5 seconds
        setTimeout(() => {
            console.log('Captured logs from iframe:', getIframeLogs());
        }, 5000);
    }
}

// Colors variables
const clrn = document.getElementById("clr-n"); // Color for the name of the move
const clrm = document.getElementById("clr-m"); // Color for the modifier
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
betterFetch('script.js', (data) => {
    window.data1 = data
    setInterval(() => {
        checkFileContent('script.js', window.data1, (data) => {
            if (!navigator.onLine) {
                return
            }
            needUpdateMessage()
        });
    }, 5000)
})