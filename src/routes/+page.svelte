<script lang="ts">
	import { writable } from "svelte/store";
	import { saveData, loadData, type Person } from "../utils/utils";
	import { onDestroy, onMount } from "svelte";
	let formFields = writable([{ oldWord: "", newWord: "" }]);
	let unsubscribe = () => {};

	const addNewField = () => {
		formFields.update((fields) => [...fields, { oldWord: "", newWord: "" }]);
	};

	const deleteField = (index: Number) => {
		formFields.update((fields) => fields.filter((_, i) => i !== index));
	};
	const setFieldsFromStorage = async () => {
		const data = await loadData();
		if (data) {
			formFields.set(data);
			if (data.length === 0) addNewField();
		}
	};

	onMount(async () => {
		await setFieldsFromStorage();
		unsubscribe = formFields.subscribe(async (fields: Person[]) => {
			await saveData(fields);
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="container">
	<h1 class="text-4xl text-center text-primary font-semibold p-5 bg-base-300 shadow-lg rounded-lg">
		TransformText
	</h1>
	<form class="p-3 space-y-1">
		{#each $formFields as field, i}
			<div class="flex space-x-2">
				<input
					class="input input-sm flex-1 input-bordered input-primary text-sm"
					type="text"
					placeholder="text to transform"
					bind:value={$formFields[i].oldWord}
				/>
				<input
					class="input input-sm flex-1 input-bordered input-primary text-sm"
					type="text"
					placeholder="text to display"
					bind:value={$formFields[i].newWord}
				/>
				<button
					class="btn btn-sm btn-error"
					type="button"
					on:click|preventDefault={() => deleteField(i)}
				>
					x
				</button>
			</div>
		{/each}
		<div class="py-1">
			<button class="btn btn-sm bg-success" type="button" on:click|preventDefault={addNewField}>
				+
			</button>
		</div>
	</form>
</div>
