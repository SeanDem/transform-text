chrome.storage.local.get(["data"], (replacements) => {
	function replaceText(node) {
		if (node.nodeType === Node.TEXT_NODE) {
			if (node.textContent) {
				let newTextContent = node.textContent;
				for (let replacement of replacements.data) {
					newTextContent = newTextContent.replace(
						new RegExp(replacement.oldWord, "gi"),
						replacement.newWord,
					);
				}
				node.textContent = newTextContent;
			}
		} else {
			for (let i = 0; i < node.childNodes.length; i++) {
				replaceText(node.childNodes[i], replacements);
			}
		}
	}
	replaceText(document.body);
});
