async function sleep2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("start")
await sleep2(2000)
console.log("end")