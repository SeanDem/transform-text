<script>
	import { writable } from "svelte/store";

	let formFields = writable([{ field1: "", field2: "" }]);

	const addNewField = () => {
		formFields.update((fields) => [...fields, { field1: "", field2: "" }]);
	};

	const deleteField = (index) => {
		formFields.update((fields) => fields.filter((_, i) => i !== index));
	};
</script>

<div class="container mx-auto max-w-xs p-1">
	<h1 class="text-lg font-bold mb-2 text-center">CorpId -> Name</h1>
	<form class="space-y-2">
		{#each $formFields as field, i}
			<div class="flex space-x-2">
				<input
					class="form-input flex-1 text-sm px-2 py-1"
					type="text"
					placeholder="Corp Id"
					bind:value={$formFields[i].field1}
				/>
				<input
					class="form-input flex-1 text-sm px-2 py-1"
					type="text"
					placeholder="Name"
					bind:value={$formFields[i].field2}
				/>
				<button
					class="btn btn-error text-sm px-3"
					type="button"
					on:click|preventDefault={() => deleteField(i)}
				>
					X
				</button>
			</div>
		{/each}
		<button
			class="btn btn-primary text-sm px-2 py-1 mt-2"
			type="button"
			on:click|preventDefault={addNewField}
		>
			+
		</button>
	</form>
</div>
