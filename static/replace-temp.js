
chrome.storage.local.get(["data"], ({ data }) => {
	function replaceText(node) {
		if (node.nodeType === Node.TEXT_NODE && node.textContent) {
			let updatedText = node.textContent;
			for (const { oldWord, newWord } of data?.words || []) {
				if (oldWord) {
					updatedText = updatedText.replace(new RegExp(oldWord, "gi"), newWord);
				}
		1	}
			node.textContent = updatedText;
		} else {
			for (const child of node.childNodes) {
				replaceText(child);
			}
		}
	}
	const startTime = performance.now();
	replaceText(document.body);
	const endTime = performance.now();
	console.log(`TransformText: Text replacement completed in ${(endTime - startTime).toFixed(2)} ms`);
});
