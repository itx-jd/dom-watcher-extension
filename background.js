chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    results: [],
    status: "Stopped",
    timezone: "Asia/Karachi",
    parentClass: "payouts-block"
  });
});
