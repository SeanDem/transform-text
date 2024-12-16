import type { Writable } from "svelte/store";

interface Word {
	oldWord: string;
	newWord: string;
}

interface Data {
	words: Word[];
}

const defaultData: () => Data = () => ({
	words: [{ oldWord: "", newWord: "" }]
});

const defaultWord: () => Word = () => ({ oldWord: "", newWord: "" });

const saveData = async (data: Data): Promise<void> => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({ data }, () => {
			if (chrome.runtime.lastError) {
				reject(`Error saving inputs: ${chrome.runtime.lastError.message}`);
			} else {
				resolve();
			}
		});
	});
};

const loadData = (): Promise<Data> => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get("data", (result) => {
			if (chrome.runtime.lastError) {
				reject(`Error loading data: ${chrome.runtime.lastError.message}`);
			} else {
				resolve(result.data);
			}
		});
	});
};

const removeDuplicatesFromList = (data: Data) => {
	const uniqueWords = new Set<string>();
	return data.words.filter(({ oldWord, newWord }) => {
		if (oldWord && newWord) {
			if (!uniqueWords.has(oldWord)) {
				uniqueWords.add(oldWord);
				return true;
			}
			return false;
		}
		return true;
	});
};

const removeDuplicates = (formFields: Writable<Data>): void => {
	formFields.update(data => {
		data.words = removeDuplicatesFromList(data);
		return data;
	});
};


export { saveData, loadData, defaultData, removeDuplicates, removeDuplicatesFromList, defaultWord};
export type { Word, Data };

