
chrome.storage.local.get(["data"], ({ data }) => {
	function replaceText(node) {
		if (node.nodeType === Node.TEXT_NODE && node.textContent) {
			let updatedText = node.textContent;
			for (const { oldWord, newWord } of data?.words || []) {
				if (oldWord) {
					updatedText = updatedText.replace(new RegExp(oldWord, "gi"), newWord);
				}
			}
			node.textContent = updatedText;
		} else {
			for (const child of node.childNodes) {
				replaceText(child);
			}
		}
	}

	replaceText(document.body);
});
