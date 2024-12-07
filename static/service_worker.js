chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo?.status === "complete" && tab.url && !isRestrictedUrl(tab.url)) {
		chrome.scripting.executeScript({
			target: { tabId },
			files: ["replace.js"],
		});
	}
});

function isRestrictedUrl(url) {
	return (
		url.startsWith("chrome://") ||
		url.startsWith("chrome-extension://") ||
		url.startsWith("about:") ||
		url.startsWith("file://")
	);
}
