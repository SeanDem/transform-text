chrome.storage.local.get(["data"], ({ data }) => {
	const replacements = data?.words?.filter(({ oldWord }) => oldWord.trim()) || [];
	if (!replacements.length) return;

	const skipTags = [
		"SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "OBJECT",
		"CANVAS", "HEAD", "TITLE", "META", "LINK"
	];

	const wordMap = Object.fromEntries(
		replacements.map(({ oldWord, newWord }) => [oldWord.toLowerCase(), newWord])
	);

	const escapedWords = replacements
		.map(({ oldWord }) => oldWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		.filter(Boolean)
		.join("|");

	if (!escapedWords) return;

	const regex = new RegExp(escapedWords, "gi");
	const startTime = performance.now();

	const filter = {
		acceptNode(node) {
			let parent = node.parentElement;
			while (parent) {
				if (skipTags.includes(parent.tagName)) {
					return NodeFilter.FILTER_REJECT;
				}
				parent = parent.parentElement;
			}
			return NodeFilter.FILTER_ACCEPT;
		}
	};

	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, filter);
	let node;
	while ((node = walker.nextNode())) {
		node.nodeValue = node.nodeValue.replace(regex, match => wordMap[match.toLowerCase()] || match);
	}
	const endTime = performance.now();
	console.log(`TransformText: Text replacement completed in ${(endTime - startTime).toFixed(2)} ms`);
});
