<script lang="ts">
	import { writable } from "svelte/store";
	import { onDestroy, onMount } from "svelte";
	import { loadData, saveData, type Data, type Word, defaultData } from "$lib";
	import Header from "./header.svelte";
	import Body from "./body.svelte";
  import { themeStore } from "$lib/themeStore";

	let data: Data;
	let formFields = writable<Data>(defaultData);
	let unsubscribe = () => {};
  
	onMount(async () => {
	  data = await loadData();
	  await setFormFields(data);
	  unsubscribe = formFields.subscribe(async (data: Data) => {
			await saveData(data);
	  });
	});

	onDestroy(() => {
		unsubscribe();
	});
  
	const setFormFields = async (data: Data) => {
	  if (data && data.words && data.words.length > 0) {
			const filteredWords = data.words.filter(word => word.oldWord?.trim() !== "");
			formFields.set({...data, words: filteredWords});
			addNewField()
		}
	};

	const addNewField = () => {
		formFields.update(data => {
			return {
				...data,
				words: [...data.words, { oldWord: "", newWord: "" }]
			};
		});
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
	};
</script>
  
<div data-theme={$themeStore} class="container">
<Header {formFields} />
<Body {formFields} />
</div>
  