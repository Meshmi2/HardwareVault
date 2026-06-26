let HARDWARE_DB = [];

async function loadDatabase() {

const files = [
"/data/cpu/intel-core2-e8400.json",
"/data/cpu/intel-i7-2600k.json",
"/data/gpu/nvidia-8800gtx.json"
];

const promises = files.map(f => fetch(f).then(r => r.json()));

HARDWARE_DB = await Promise.all(promises);

console.log("Database loaded:", HARDWARE_DB.length);
}