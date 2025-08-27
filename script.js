// ----- Select Navbar Elements ------
const heartBtn = document.querySelector(".btn1");   
const coinBtn  = document.querySelector(".btn2");   
const copyBtn  = document.querySelector(".btn3");  

// --------- Select Card Elements ----------
const cards = document.querySelectorAll(".card");

// -------- Select History Elements ----------
const historyList     = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// -------- Initial Values -------
let heartCount = 0;
let coinCount  = 100;
let copyCount  = 0;


function escapeHtml(str = "") {
  const d = document.createElement("div");
  d.textContent = String(str);
  return d.innerHTML;
}

// ------------ Update Navbar Display ----------
function updateNavbar() {
  if (heartBtn) heartBtn.innerHTML = `${heartCount} <img class="heart" src="assets/heart.png" alt="heart">`;
  if (coinBtn)  coinBtn.innerHTML  = `${coinCount} <img class="coin" src="assets/coin.png" alt="coin">`;
  if (copyBtn)  copyBtn.textContent = `${copyCount} Copy`;
}

// -------- Add Event Listeners for Each Card ----------
cards.forEach(card => {
  const heartIcon   = card.querySelector(".card-top .heart, .heart-icon"); 
  const copyButton  = card.querySelector(".copy");
  const callButton  = card.querySelector(".call");

  const serviceName   = card.dataset.name || card.getAttribute("data-name");
  const serviceNumber = card.dataset.number || card.getAttribute("data-number");

  // Heart Icon Click 
  if (heartIcon) {
    heartIcon.addEventListener("click", () => {
      heartCount++;
      updateNavbar();
    });
  }

  //  Copy Button Click 
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(serviceNumber || "").then(() => {
        copyCount++;
        updateNavbar();
        alert(`Hotline copied: ${serviceNumber}`);
      }).catch(err => console.error("Clipboard error:", err));
    });
  }

  //  Call Button Click 
  if (callButton) {
    callButton.addEventListener("click", () => {
      if (coinCount < 20) {
        alert("Not enough coins to make a call!");
        return;
      }

      alert(`Calling ${serviceName} (${serviceNumber})`);

      // Deduct coins
      coinCount -= 20;
      updateNavbar();

      // Add entry to history with current time
      const now  = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      const li = document.createElement("li");
      li.innerHTML = `
        <div class="left">
          <strong>${escapeHtml(serviceName)}</strong>
          <span>${escapeHtml(serviceNumber)}</span>
        </div>
        <div class="time">${time}</div>
      `;

      if (historyList) {
        historyList.prepend(li);
      }
    });
  }
});

// Clear History Button
if (clearHistoryBtn && historyList) {
  clearHistoryBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
  });
}

//-------Initialize Navbar-------
updateNavbar();
