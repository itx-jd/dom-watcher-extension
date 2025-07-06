let observer = null;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "start") {
    const parent = document.querySelector(`.${msg.parentClass}`);
    if (!parent) {
      alert("Parent class not found!");
      return;
    }

    observer?.disconnect();

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          setTimeout(() => {
            const payouts = parent.querySelectorAll('.payout');
            if (payouts.length === 0) return;

            const latest = payouts[0];
            const value = latest.innerText.trim();

            if (value.endsWith("x")) {
              const time = new Date().toLocaleString("en-US", {
                timeZone: msg.timezone,
                hour12: false
              });
              

              // ✅ Directly store in local storage — no popup needed
              chrome.storage.local.get("results", (data) => {
                const results = data.results || [];
                results.push({ time, value });
                chrome.storage.local.set({ results });
              });
            }
          }, 100);
        }
      }
    });

    observer.observe(parent, { childList: true });
  }

  if (msg.action === "stop") {
    observer?.disconnect();
    observer = null;
  }

  if (msg.action === "export") {
    chrome.storage.local.get("results", (data) => {
      const csv = "Time,Value\n" + (data.results || []).map(e => `${e.time},${e.value}`).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payouts.csv";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
});
