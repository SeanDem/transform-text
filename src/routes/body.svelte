<script lang="ts">
	import { writable } from "svelte/store";
	import { type Data, defaultData } from "$lib";

	export let formFields = writable<Data>(defaultData());

	const addNewField = () => {
		formFields.update(data => {
			return {
				...data,
				words: [{ oldWord: "", newWord: "" }, ...(data.words || [])],
			};
		});
	};

	const deleteField = (index: number) => {
		formFields.update(data => {
			return {
				...data,
				words: data.words.filter((_, i) => i !== index),
			};
		});
	};

	const clearAllFields = () => {
			formFields.set({ words: []});
			formFields.set(defaultData())
	};
</script>

<div class="flex justify-between p-2">
	<div class="flex">
		<button
			class="btn btn-sm btn-success"
			type="button"
			on:click|preventDefault={addNewField}>
			+
		</button>
	</div>
	<div class="flex">
		<button
			class="btn btn-sm btn-error"
			type="button"
			on:click|preventDefault={clearAllFields}>
			Delete All
		</button>
	</div>
</div>
{#each $formFields.words as field, i}
	<div class="flex justify-between px-2 pt-1">
		<input
			class="input input-sm input-bordered input-primary text-sm w-44"
			type="text"
			placeholder="text to transform"
			bind:value={field.oldWord}
		/>
		<input
			class="input input-sm input-bordered input-primary text-sm w-44"
			type="text"
			placeholder="text to display"
			bind:value={field.newWord}
		/>
			<button
				class="btn btn-sm btn-error"
				type="button"
				on:click|preventDefault={() => deleteField(i)}>
				x
			</button>
	</div>
{/each}
