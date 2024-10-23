function copy_mac() {
    var mac = document.getElementById("mac")
    mac.select();
    mac.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(mac.innerText);
}


// Wait for the iframe to load
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
                    console.log(args[1].move)
                     var lol = 1
                    // switch to get the correct move to send to the ev3
                    switch(args[1].move) {
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
                        default:
                            lol = 0
                    }
                    if (lol == 1) {setTimeout(clr_reset, 2000)}
                    else {console.log("LOL = :(")}
                }
            }
        };

        // Function to get the captured logs
        function getIframeLogs() {
            return logs;
        }

        // Example usage: Print logs after 5 seconds
        setTimeout(() => {
            console.log('Captured logs from iframe:', getIframeLogs());
        }, 5000);
    }
};

const clrn = document.getElementById("clr-n") // Color for the name of the move
const clrm = document.getElementById("clr-m") // Color for the modifier

function clr_reset() {
    clrn.style.background = "black"; // No move
    clrm.style.background = "black"; // No modifier
}
function clr_r() {
    clrn.style.background = "red"; // Right
    clrm.style.background = "red"; // No modifier
}
function clr_rp() {
    clrn.style.background = "red" // Right
    clrm.style.background = "blue" // Modifier (prime ')
}
//======================================================
function clr_f() {
    clrn.style.background = "blue"; // Front
    clrm.style.background = "red"; // No modifier
}
function clr_fp() {
    clrn.style.background = "blue" // Front
    clrm.style.background = "blue" // Modifier (prime ')
}
//======================================================
function clr_l() {
    clrn.style.background = "green"; // Left
    clrm.style.background = "red"; // No modifier
}
function clr_lp() {
    clrn.style.background = "green" // Left
    clrm.style.background = "blue" // Modifier (prime ')
}
//====================================================
function clr_b() {
    clrn.style.background = "yellow"; // Back
    clrm.style.background = "red"; // No modifier
}
function clr_bp() {
    clrn.style.background = "yellow" // Back
    clrm.style.background = "blue" // Modifier (prime ')
}
//====================================================
function clr_d() {
    clrn.style.background = "pink"; // Down
    clrm.style.background = "red"; // No modifier
}
function clr_dp() {
    clrn.style.background = "pink" // Down
    clrm.style.background = "blue" // Modifier (prime ')
}