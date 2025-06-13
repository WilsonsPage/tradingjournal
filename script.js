const addTradeBtn = document.getElementById("addTradeBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const tradeForm = document.getElementById("tradeForm");
const tradeTable = document.querySelector("#tradeTable tbody");

let trades = JSON.parse(localStorage.getItem("trades")) || [];
let editingIndex = null;

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

addTradeBtn.onclick = () => {
  editingIndex = null;
  tradeForm.reset();
  modal.classList.remove("hidden");
};

closeModal.onclick = () => modal.classList.add("hidden");

tradeForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(tradeForm);
  const tradeData = {};
  formData.forEach((value, key) => {
    tradeData[key] = value;
  });

  if (editingIndex !== null) {
    trades[editingIndex] = tradeData;
    editingIndex = null;
  } else {
    trades.push(tradeData);
  }

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
  editingIndex = index;
  modal.classList.remove("hidden");
};

renderTrades();
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
  <td>
    <button onclick="editTrade(${index})">Edit</button>
    <button onclick="removeTrade(${index})" style="margin-left:5px; color: red;">Remove</button>
  </td>
`;
window.removeTrade = (index) => {
  if (confirm("Delete this trade?")) {
    trades.splice(index, 1);
    saveTrades();
    renderTrades();
  }
};

