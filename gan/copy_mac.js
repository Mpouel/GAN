function copy_mac() {
    var mac = document.getElementById("mac").value
    mac.select();
    mac.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(mac.innerText);
}