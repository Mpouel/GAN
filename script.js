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

function clr_r() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "red"; // Right
    clrm.style.background = "red"; // No modifier
}
function clr_rp() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "red" // Right
    clrm.style.background = "blue" // Modifier (prime ')
}
function clr_r2() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "red" // Right
    clrm.style.background = "green" // Modifier (2)
}
//======================================================
function clr_f() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "blue"; // Front
    clrm.style.background = "red"; // No modifier
}
function clr_fp() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move 
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "blue" // Front
    clrm.style.background = "blue" // Modifier (prime ')
}
function clr_f2() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move 
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "blue" // Front
    clrm.style.background = "green" // Modifier (2)
}
//======================================================
function clr_l() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "green"; // Left
    clrm.style.background = "red"; // No modifier
}
function clr_lp() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "green" // Left
    clrm.style.background = "blue" // Modifier (prime ')
}
function clr_l2() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "green" // Left
    clrm.style.background = "green" // Modifier (2)
}
//====================================================
function clr_b() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "yellow"; // Back
    clrm.style.background = "red"; // No modifier
}
function clr_bp() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "yellow" // Back
    clrm.style.background = "blue" // Modifier (prime ')
}
function clr_b2() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "yellow" // Back
    clrm.style.background = "green" // Modifier (2)
}
//====================================================
function clr_d() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "pink"; // Down
    clrm.style.background = "red"; // No modifier
}
function clr_dp() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "pink" // Down
    clrm.style.background = "blue" // Modifier (prime ')
}
function clr_d2() {
    const clrn = document.getElementById("clr-n") // Color for the name of the move
    const clrm = document.getElementById("clr-m") // Color for the modifier
    clrn.style.background = "pink" // Down
    clrm.style.background = "green" // Modifier (2)
}



// batterie code
function batterieChangeValue(selector, value) {
    document
      .querySelector(selector)
      .style.setProperty("--middle", String(100 - value) + "%");
    document
      .querySelector(selector)
      .style.setProperty(
        "--middle",
        document.querySelector(selector).style.getPropertyValue("--middle")
      );
    document.querySelector(selector).dataset.charge = String(value) + "%";
  }
  function batterieChargeState(selector, value) {
    if (value) {
      document
        .querySelector(selector)
        .style.setProperty("--visbility", "visible");
    } else {
      document.querySelector(selector).style.setProperty("--visbility", "hidden");
    }
  }
  
batterieChangeValue(".cssBatterie", 100);
batterieChargeState(".cssBatterie", true);