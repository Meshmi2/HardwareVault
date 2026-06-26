function generate() {

const brand = document.getElementById("brand").value;
const model = document.getElementById("model").value;
const year = document.getElementById("year").value;
const category = document.getElementById("category").value;
const specs = document.getElementById("specs").value;
const images = document.getElementById("images").files;

const id = (brand + "-" + model).toLowerCase().replace(/\s/g, "-");

let imagePaths = [];

for (let i = 0; i < images.length; i++) {
imagePaths.push(`/images/${category.toLowerCase()}/${id}/${images[i].name}`);
}

const data = {
id,
brand,
model,
year,
category,
specs,
images: imagePaths
};

document.getElementById("output").textContent =
JSON.stringify(data, null, 2);

downloadJSON(data);
}

function downloadJSON(data) {

const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});

const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = data.id + ".json";
a.click();
}

document.getElementById("searchBox").addEventListener("input", function(e) {

const query = e.target.value;

const results = searchHardware(query);

renderResults(results);

});
function renderResults(results) {

const container = document.getElementById("results");

container.innerHTML = results.map(item => `

<div class="card">
<h3>${item.brand} ${item.model}</h3>
<p>${item.year} - ${item.category}</p>
<p>${item.specs}</p>

<a href="/pages/${item.id}.html">View</a>

</div>

`).join("");

}

const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    themeToggle.textContent = 'Light Mode';
  } else {
    document.documentElement.classList.remove('dark-theme');
    themeToggle.textContent = 'Dark Mode';
  }
}

if (themeToggle) {
  const storedTheme = localStorage.getItem('siteTheme') || 'default';
  applyTheme(storedTheme);

  themeToggle.addEventListener('click', function () {
    const nextTheme = document.documentElement.classList.contains('dark-theme') ? 'default' : 'dark';
    localStorage.setItem('siteTheme', nextTheme);
    applyTheme(nextTheme);
  });
}
