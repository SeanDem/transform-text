<script lang="ts">
	import { onMount } from "svelte";
	import { Theme } from "$lib/themes";
	import { themeStore } from "$lib/themeStore";

	export let themes = Object.values(Theme).sort();


	onMount(() => {
		const theme = localStorage.getItem("theme");
		if (theme) {
			themeStore.set(theme as Theme);
		} else themeStore.set(Theme.Cupcake);

		themeStore.subscribe((value) => {
			localStorage.setItem("theme", value);
		});
	});

	function changeTheme(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		themeStore.set(event.currentTarget.value as Theme);
	}
</script>

<select class="btn btn-primary btn-sm text-sm" bind:value={$themeStore} on:change={changeTheme}>
	{#each themes as theme}
		<option value={theme}>{theme[0].toUpperCase() + theme.slice(1)}</option>
	{/each}
</select>
