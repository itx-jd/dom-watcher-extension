function updateLog() {
  chrome.storage.local.get("results", (data) => {
    const log = document.getElementById("log");
    log.innerHTML = "";
    (data.results || []).slice().reverse().forEach(entry => {
      const div = document.createElement("div");
      div.textContent = `${entry.time} | ${entry.value}`;
      log.appendChild(div);
    });
  });
}

function updateStatus() {
  chrome.storage.local.get("status", (data) => {
    document.getElementById("statusValue").textContent = data.status || "Stopped";
  });
}

document.getElementById("startBtn").addEventListener("click", () => {
  const parentClass = document.getElementById("parentClass").value.trim();
  const timezone = document.getElementById("timezone").value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (parentClass) => {
        return !!document.querySelector(`.${parentClass}`);
      },
      args: [parentClass]
    }, (results) => {
      const found = results && results[0] && results[0].result;

      if (!found) {
        showSnackbar(`⚠️ Class ".${parentClass}" not found`);
        return;
      }

      chrome.storage.local.set({ timezone, parentClass, status: "Running", results: [] });
      chrome.tabs.sendMessage(tabs[0].id, { action: "start", parentClass, timezone });
      updateStatus();
      updateLog();
    });
  });
});


document.getElementById("stopBtn").addEventListener("click", () => {
  chrome.storage.local.set({ status: "Stopped" });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
  });
  updateStatus();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "export" });
  });
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  updateLog();
  updateStatus();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  chrome.storage.local.set({ results: [] }, () => {
    updateLog();
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "log") {
    chrome.storage.local.get("results", (data) => {
      const results = data.results || [];
      results.push(msg.data);
      chrome.storage.local.set({ results }, updateLog);
    });
  }
});

function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}


updateStatus();
updateLog();
