<script lang="ts">
	import { type Writable, writable } from "svelte/store";
	import { onDestroy, onMount } from "svelte";
	import {
		type Data,
		defaultData,
		loadData,
		removeDuplicates,
		removeDuplicatesFromList,
		saveData,
	} from "$lib";
	import Header from "./header.svelte";
	import Body from "./body.svelte";
	import { themeStore } from "$lib/themeStore";

	let formFields = writable<Data>(defaultData());
	let unsubscribe = () => {
	};

	onMount(async () => {
		await loadFormFields();
		unsubscribe = formFields.subscribe(data => {
			console.log("tick")
			const deduplicatedWords = removeDuplicatesFromList(data);
			if (deduplicatedWords.length !== data.words.length) {
				formFields.set({
					...data,
					words: deduplicatedWords
				});
			}

			saveData({ words: deduplicatedWords });
		});
	});


	onDestroy(() => {
		saveData(formFields.words);
		unsubscribe();
	});

	const loadFormFields = async () => {
		const data: Data = await loadData();
		if (data && data.words && data.words.length > 0) {
			const filteredWords = data.words.filter(word => word.oldWord?.trim() !== "");
			formFields.set({ ...data, words: filteredWords });
			addNewField();
		}
	};

	const addNewField = () => {
		formFields.update(data => {
			return {
				...data,
				words: [{ oldWord: "", newWord: "" }, ...data.words],
			};
		});
	};
</script>

<div data-theme={$themeStore} class="container py-4 px-1">
	<Header {formFields} />
	<Body {formFields} />
</div>
  