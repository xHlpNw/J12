const prices = [
    70.74, 70.7, 68.12, 68.74, 67.52, 67.92, 67.8, 67.85, 68.91,
    68.91, 69.66, 67.65, 67.59, 68.65, 67.4, 70.61, 71.92, 71.65,
    71.85, 71.47, 72.09, 71.57, 71, 70.93, 72.58, 72.66, 72.68
];

const arrowUpSVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9b2a">
  <path d="M12 4l-6 8h4v8h4v-8h4z"/>
</svg>`;

const arrowDownSVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="#d32f2f">
  <path d="M12 20l6-8h-4V4h-4v8H6z"/>
</svg>`;

const oilTableBody = document.querySelector('#oil-table tbody');

let growths = [], chainIndices = [];
let posCount = 0, negCount = 0;

for (let t = 0; t < prices.length; t++) {
  let row = document.createElement('tr');
  let price = prices[t];

  let dPrice = "";
  let idxPercent = "";
  let rPercent = "";
  let signal = "";

  if (t > 0) {

    let diff = price - prices[t - 1];
    let index = price / prices[t - 1];

    dPrice = diff.toFixed(2);
    idxPercent = (index * 100).toFixed(2) + "%";
    rPercent = ((index - 1) * 100).toFixed(2) + "%";

    growths.push(diff);
    chainIndices.push(index);

    if (diff > 0) {
      posCount++;
      signal = arrowUpSVG;
    } else if (diff < 0) {
      negCount++;
      signal = arrowDownSVG;
    }
  }

  row.innerHTML = `
    <td class="centering-cell">${t + 1}</td>
    <td class="centering-cell">${signal}</td>
    <td>${price.toFixed(2)}</td>
    <td>${dPrice}</td>
    <td>${idxPercent}</td>
    <td>${rPercent}</td>
  `;

  oilTableBody.appendChild(row);
}

const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);
const avgGrowth = growths.length
    ? growths.reduce((a,b) => a+b,0) / growths.length
    : 0;

const geoMeanChain = chainIndices.length
    ? Math.pow(chainIndices.reduce((a,b) => a*b,1), 1/chainIndices.length)
    : 0;

document.getElementById('priceSummary').textContent =
    "Макс: " + maxPrice + "\nМин: " + minPrice;

document.getElementById('increaseSummary').textContent =
    "Среднее: " + avgGrowth.toFixed(4);

document.getElementById('growthRateSummary').textContent =
    "Среднее: " + (geoMeanChain * 100).toFixed(2) + "%";

document.getElementById('increaseRateSummary').innerHTML =
    `<div class="summary-line">${posCount} ${arrowUpSVG}</div><div class="summary-line">${negCount} ${arrowDownSVG}</div>`;