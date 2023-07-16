export interface Person {
	corpId: string;
	name: string;
}
const saveData = async (data: Person[]) => {
	await chrome.storage.local.set(data).catch((err) => {
		alert("Error saving inputs" + err);
	});
};

const loadData = async () => {
	await chrome.storage.local.get("data", (data) => {
		return data;
	});
};
