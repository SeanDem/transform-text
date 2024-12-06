chrome.storage.local.get(["data"], ({ data }) => {
	const replacements = data
		.filter(({ oldWord }) => oldWord)
		.map(({ oldWord, newWord }) => ({
			regExp: new RegExp(`(${oldWord})`, "gi"),
			replacement: newWord
		}));

	function replaceText(node) {
		if (node.nodeType !== Node.TEXT_NODE) {
			Array.from(node.childNodes).forEach(replaceText);
			return;
		}

		let newText = replacements.reduce((text, { regExp, replacement }) =>
			text.replace(regExp, replacement), node.textContent);

		if (newText === node.textContent) return;

		const fragment = document.createRange().createContextualFragment(newText);
		node.parentNode.insertBefore(fragment, node);
		node.remove();
	}

	replaceText(document.body);
});
