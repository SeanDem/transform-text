chrome.storage.local.get(["data"], ({ data }) => {
	const replacements = data?.words?.filter(({ oldWord }) => oldWord.trim()) || [];
	const regex = new RegExp(replacements.map(({ oldWord }) => oldWord).join("|"), "gi");

	function replaceText(node) {
		if (node.nodeType === Node.TEXT_NODE && node.textContent) {
			node.textContent = node.textContent.replace(regex, match => {
				const replacement = replacements.find(({ oldWord }) => oldWord.toLowerCase() === match.toLowerCase());
				return replacement ? replacement.newWord : match;
			});
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