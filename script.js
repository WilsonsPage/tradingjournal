const addTradeBtn = document.getElementById("addTradeBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const tradeForm = document.getElementById("tradeForm");
const tradeTable = document.querySelector("#tradeTable tbody");

let trades = JSON.parse(localStorage.getItem("trades")) || [];

function renderTrades() {
  tradeTable.innerHTML = "";
  trades.forEach((trade, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${trade.pair}</td>
      <td>${trade.buySell}</td>
      <td>${trade.result}</td>
      <td>${trade.unrealized}</td>
      <td>${trade.drawdown}</td>
      <td>${trade.keyLevel}</td>
      <td>${trade.timeframe}</td>
      <td>${trade.date}</td>
      <td>${trade.day}</td>
      <td>${trade.atr}</td>
      <td>${trade.session}</td>
      <td>${trade.notes}</td>
      <td>${trade.beforeSS || ''}</td>
      <td>${trade.afterSS || ''}</td>
      <td><button onclick="editTrade(${index})">Edit</button></td>
    `;
    tradeTable.appendChild(row);
  });
}

function saveTrades() {
  localStorage.setItem("trades", JSON.stringify(trades));
}

addTradeBtn.onclick = () => modal.classList.remove("hidden");
closeModal.onclick = () => modal.classList.add("hidden");

tradeForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(tradeForm);
  const newTrade = {};
  formData.forEach((value, key) => {
    newTrade[key] = value;
  });
  trades.push(newTrade);
  saveTrades();
  renderTrades();
  modal.classList.add("hidden");
  tradeForm.reset();
};

window.editTrade = (index) => {
  const trade = trades[index];
  for (let key in trade) {
    if (tradeForm[key]) {
      tradeForm[key].value = trade[key];
    }
  }
  modal.classList.remove("hidden");
  tradeForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(tradeForm);
    formData.forEach((value, key) => {
      trade[key] = value;
    });
    saveTrades();
    renderTrades();
    modal.classList.add("hidden");
    tradeForm.reset();
    tradeForm.onsubmit = defaultSubmit; // reset to default after edit
  };
};

function defaultSubmit(e) {
  e.preventDefault();
  const formData = new FormData(tradeForm);
  const newTrade = {};
  formData.forEach((value, key) => {
    newTrade[key] = value;
  });
  trades.push(newTrade);
  saveTrades();
  renderTrades();
  modal.classList.add("hidden");
  tradeForm.reset();
}
tradeForm.onsubmit = defaultSubmit;

renderTrades();
