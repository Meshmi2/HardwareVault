let DATABASE = [];

async function loadEngine() {

const res = await fetch("/data/index.json");
DATABASE = await res.json();

console.log("Engine loaded:", DATABASE.length, "items");
}
function searchEngine(query) {

query = query.toLowerCase();

return DATABASE
.map(item => {

let score = 0;

if (item.search.includes(query)) score += 5;
if (item.model.toLowerCase().includes(query)) score += 10;
if (item.brand.toLowerCase().includes(query)) score += 3;
if (item.category.toLowerCase().includes(query)) score += 2;
if (item.year.toString().includes(query)) score += 1;

return { ...item, score };

})
.filter(item => item.score > 0)
.sort((a, b) => b.score - a.score);

}
document.getElementById("searchBox").addEventListener("input", (e) => {

const results = searchEngine(e.target.value);

renderResults(results);

});
function renderResults(results) {

const box = document.getElementById("results");

box.innerHTML = results.map(item => `

<div class="card">

<h3>${item.brand} ${item.model}</h3>

<p>${item.category} - ${item.year}</p>

<a href="/pages/${item.id}.html">Open</a>

</div>

`).join("");

}
