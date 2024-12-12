chrome.storage.local.get(["data"], ({ data }) => {
	const replacements = data?.words?.filter(({ oldWord }) => oldWord.trim()) || [];
	if (!replacements.length) return;

	// Build a fast lookup map
	const wordMap = Object.fromEntries(
		replacements.map(({ oldWord, newWord }) => [oldWord.toLowerCase(), newWord])
	);

	// Create a single regex
	const escapedWords = replacements
		.map(({ oldWord }) => oldWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		.filter(Boolean)
		.join("|");

	if (!escapedWords) return;

	const regex = new RegExp(escapedWords, "gi");

	const startTime = performance.now();

	// Use a TreeWalker to handle all text nodes
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
	let node;
	while ((node = walker.nextNode())) {
		node.nodeValue = node.nodeValue.replace(regex, match => wordMap[match.toLowerCase()] || match);
	}

	const endTime = performance.now();
	console.log(`TransformText: Text replacement completed in ${(endTime - startTime).toFixed(2)} ms`);
});