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
					class="border-accent border-2 text-white  rounded-md px-4 py-2 mt-4 flex flex-row justify-between lg:justify-start lg:gap-3 items-center w-full lg:w-auto"
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
				<DesktopIcon name={$t('common.home.snake')} type="custom" href="/games/snake">
					<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M19.5 17H18c1.1 0 2-.9 2-2s-.9-2-2-2V9c0-1 0-2-1.08-2.86c.05-.21.08-.42.08-.64C17 3.57 15 2 12.5 2c-2.26 0-4.12 1.31-4.43 3H6L3.71 2.79L3 3.5l2 2l-2 2l.71.71L6 6h2.07c.31 1.69 2.17 3 4.43 3c.5 0 1-.08 1.43-.2c.04.07.07.14.07.2v4H8c-1.1 0-2 .9-2 2s.9 2 2 2H6.5A2.5 2.5 0 0 0 4 19.5c0 .17 0 .34.05.5H4c-1.1 0-2 .9-2 2h17.5a2.5 2.5 0 0 0 0-5M12 5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"/></svg>
				</DesktopIcon>
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