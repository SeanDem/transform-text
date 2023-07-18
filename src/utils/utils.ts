export interface Person {
	oldWord: string;
	newWord: string;
}

const saveData = async (data: Person[]): Promise<void> => {
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

const loadData = (): Promise<Person[] | undefined> => {
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

export { saveData, loadData };
