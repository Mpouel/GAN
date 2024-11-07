async function sleep2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function lol() {
    console.log("start")
    await sleep2(2000)
    console.log("end")
}