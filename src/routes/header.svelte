<script lang="ts">
	import { type Data, defaultData, type Word } from "$lib";
	import { writable } from "svelte/store";
	import ThemeDropdown from "./themeDropdown.svelte";

	export let formFields = writable<Data>(defaultData);

	const downloadFormData = () => {
		const filteredWords = $formFields.words.filter(
			(item: Word) => item.oldWord.trim() !== "" || item.newWord.trim() !== "");
		const csvRows = [];
		csvRows.push(["Old Word", "New Word"].join(","));
		filteredWords.forEach((item: Word) => {
			csvRows.push([item.oldWord, item.newWord].join(","));
		});
		const csvContent = csvRows.join("\n");
		const csvBlob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(csvBlob);
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().split("T")[0];
		const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, "-").replace(/\//g, "-");
		const filename = `text-transform-${formattedDate}-${formattedTime}.csv`;
		console.log(filename);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};


	const uploadFormData = (event: Event) => {
		const fileInput = event.target as HTMLInputElement;
		const file = fileInput.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const csvContent = event.target?.result as string;
				const rows = csvContent.split("\n");
				let words = rows.slice(1).map((row) => {
					const [oldWord, newWord] = row.split(",");
					return { oldWord: oldWord.trim(), newWord: newWord.trim() };
				});
				words = words.filter(
					word => word.oldWord !== "Old Word" && word.newWord !== "New Word",
				);
				formFields.update(currFields => {
					const filteredWords = currFields.words.filter(word => word.oldWord?.trim() !== "");
					return {
						...currFields,
						words: [
							...filteredWords,
							...words,
							{ oldWord: "", newWord: "" },
						],
					};
				});
			} catch (error) {
				console.error("Error processing CSV data:", error);
			}
		};
		reader.readAsText(file);
		fileInput.value = "";
	};

	const onUploadClick = () => {
		document.getElementById("fileInput")?.click();
	};
</script>

<div>
	<h1 class="text-5xl text-center text-primary font-semibold py-4">
		TransformText
	</h1>
	<div class="flex flex-col mx-2">
		<input
			type="file"
			id="fileInput"
			accept=".csv"
			style="display: none;"
			on:change={uploadFormData}
		/>
		<div class="flex flex-row justify-between">
			<button class="flex btn btn-sm btn-success items-center w-[15ch]" on:click={onUploadClick}>
				<i class="fas fa-upload mr-1"></i>
				Upload
			</button>
			<ThemeDropdown />
			<button class="flex btn btn-sm btn-success items-center w-[15ch]" on:click={downloadFormData}>
				<i class="fas fa-download mr-1"></i>
				Download
			</button>
		</div>
	</div>
	<div class="divider divider-primary opacity-50 m-0 mb-1 "></div>
</div>
