<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
	import { windows } from '$lib/windows.svelte';
	import DesktopIcon from "$lib/components/DesktopIcon.svelte";
import '../app.css';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { t } from '$lib/translations';
	import { typeIn } from '$lib/actions';
	import { writable } from 'svelte/store';
	let { children } = $props();

	let footerWindows = $derived(windows.windows.filter(window => (window.pin || window.match.test($page.url.pathname))));

	let searchBarOpen = $state(false);

	const blinking = writable(false);

	const handleKeyPress = (event: KeyboardEvent) => {
		console.log(`'${event.key}' && ${event.shiftKey}`)
		if (event.key === ' ' && event.ctrlKey) {
			searchBarOpen = !searchBarOpen;
		}
	}
</script>

<svelte:window onkeydown={handleKeyPress} />

<div
	class="flex flex-row justify-center items-center h-screen w-screen bg-primary text-white"
>
	<main
		class="xl:w-[1140px] w-full h-full lg:h-[720px] xl:border-8 xl:border-black rounded-md overflow-clip flex flex-col relative" 
	>
		<Header />

		<div class="flex flex-col lg:flex-row items-center justify-between flex-1 px-16 relative">

			<div class="lg:mb-16 lg:w-1/2">
				<h1 class="text-6xl font-bold whitespace-pre-wrap border-r-8 w-fit border-accent overflow-hidden pr-1" class:type-in={$blinking} use:typeIn={{ interval: 200, blinking }}>
					{$t('common.home.title')}
				</h1>
				<p class="text-2xl">
					{$t('common.home.description')}
				</p>

				<button
					class="border-accent border-2 text-white  rounded-md px-4 py-2 mt-4 flex flex-row gap-3 items-center"
					onclick={() => { searchBarOpen = true; }}
				>
					<span>
						{$t('common.home.search')}
					</span>
					

					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
				</button>
			</div>

			<div
				class="grid grid-cols-2 gap-4"
			>
				<DesktopIcon name={$t('common.home.about-me')} type="file" href="/folders/about-me" />
				<DesktopIcon name={$t('common.home.projects')} type="folder" href="/folders/projects" />
				<DesktopIcon name={$t('common.home.articles')} type="folder" href="/folders/articles" />
			</div>

			{@render children()}
		</div>


		<Footer 
			footerItems={footerWindows}
		/>

		<SearchBar bind:open={searchBarOpen} />
	</main>

</div>

<style lang="postcss">
	.type-in {
		animation: 
			blink-caret .75s step-end infinite;
	}

	@keyframes typing {
		from { width: 0px }
		to { width: 82% }
	}

	@keyframes blink-caret {
		from, to { border-color: transparent }
		50% { @apply border-accent }
	}
</style>