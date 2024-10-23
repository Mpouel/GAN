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
            console.log(args[0].type)
        };

        // Function to get the captured logs
        function getIframeLogs() {
            var logs1 = logs
            var logs = []
            return logs1;
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
function clr_r2() {
    clrn.style.background = "red" // Right
    clrm.style.background = "green" // Modifier (2)
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
function clr_f2() {
    clrn.style.background = "blue" // Front
    clrm.style.background = "green" // Modifier (2)
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
function clr_l2() {
    clrn.style.background = "green" // Left
    clrm.style.background = "green" // Modifier (2)
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
function clr_b2() {
    clrn.style.background = "yellow" // Back
    clrm.style.background = "green" // Modifier (2)
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
function clr_d2() {
    clrn.style.background = "pink" // Down
    clrm.style.background = "green" // Modifier (2)
}