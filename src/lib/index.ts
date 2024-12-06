interface Word {
	oldWord: string;
	newWord: string;
}

interface Data {
	words: Word[];
}

const defaultData: Data = { words: [{ oldWord: "", newWord: "" }] };

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

export { saveData, loadData, defaultData };
export type { Word, Data };

