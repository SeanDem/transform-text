chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (!tab.url || !tabId) return;
	if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ["replace.js"],
		});
	}
});
