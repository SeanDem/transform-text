<script>
	import { writable } from "svelte/store";

	let formFields = writable([{ corpId: "", name: "" }]);

	const addNewField = () => {
		formFields.update((fields) => [...fields, { corpId: "", name: "" }]);
	};

	const deleteField = (index) => {
		formFields.update((fields) => fields.filter((_, i) => i !== index));
	};
	const save = () => {
		console.log(formFields);
	};

	formFields.subscribe(async (fields: Person[]) => {
		await localStorage.setItem("corpIdToName", JSON.stringify(fields));
		await alert(localStorage.getItem("corpIdToName"));
	});
</script>

<div class="container">
	<h1 class="text-4xl text-center text-primary font-semibold p-5 bg-base-300 shadow-lg rounded-lg">
		CorpId to Name
	</h1>
	<form class="p-3 space-y-1">
		{#each $formFields as field, i}
			<div class="flex space-x-2">
				<input
					class="input input-sm flex-1 w-20 input-bordered input-primary text-sm"
					type="text"
					placeholder="CorpId to replace"
					bind:value={$formFields[i].corpId}
				/>
				<input
					class="input input-sm flex-1 input-bordered input-primary text-sm"
					type="text"
					placeholder="Name to display"
					bind:value={$formFields[i].name}
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
		<div class="py-1 flex align-end">
			<button class="flex-1 btn btn-sm bg-primary" type="button" on:click|preventDefault={save}
				>Save</button
			>
		</div>
	</form>
</div>
