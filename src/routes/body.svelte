<script lang="ts">
	import { writable } from "svelte/store";
	import { type Data, defaultData } from "$lib";

	export let formFields = writable<Data>(defaultData);

	const addNewField = () => {
		formFields.update(data => {
			return {
				...data,
				words: [...(data.words || []), { oldWord: "", newWord: "" }],
			};
		});
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
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
</script>

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
		<div>
			<button
				class="btn btn-sm btn-error ml-1"
				type="button"
				on:click|preventDefault={() => deleteField(i)}>
				x
			</button>
		</div>
	</div>
{/each}
<div class="p-2">
	<button
		class="btn btn-sm bg-success"
		type="button"
		on:click|preventDefault={addNewField}>
		+
	</button>
</div>
