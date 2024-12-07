<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { meta } from '$lib/meta.svelte';
	import { windows } from '$lib/windows.svelte';
	import DesktopIcon from "$lib/components/DesktopIcon.svelte";
import '../app.css';
	import SearchBar from '$lib/components/SearchBar.svelte';
	let { children } = $props();

	let footerWindows = $derived(windows.windows.filter(window => (window.pin || window.match.test($page.url.pathname))));

	let searchBarOpen = $state(false);

	const handleKeyPress = (event: KeyboardEvent) => {
		console.log(`'${event.key}' && ${event.shiftKey}`)
		if (event.key === ' ' && event.ctrlKey) {
			searchBarOpen = !searchBarOpen;
		}
	}
</script>

<svelte:window onkeydown={handleKeyPress} />

<Meta 
	title={meta.description} 
	description={meta.description} 
	image={meta.image} 
/>

<div
	class="flex flex-row justify-center items-center h-screen w-screen bg-primary text-white"
>
	<main
		class="w-[1140px] h-[720px] border-8 border-black rounded-md overflow-clip flex flex-col relative" 
	>
		<Header />

		<div class="flex flex-row items-center justify-between flex-1 px-16 relative">

			<div class="mb-16 w-1/2">
				<h1 class="text-6xl font-bold type-in whitespace-nowrap border-r-8 w-fit border-accent overflow-hidden pr-1">
					Hi, I'm Marley
				</h1>
				<p class="text-2xl">
					Software Engineer & Sigma Male based in Osaka, Japan
				</p>
			</div>

			<div
				class="grid grid-cols-2 gap-4"
			>
				<DesktopIcon name="About Me" type="file" href="/folders/about-me" />
				<DesktopIcon name="Projects" type="folder" href="/folders/projects" />
				<DesktopIcon name="Articles" type="folder" href="/folders/articles" />
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
			typing 3.5s steps(40, end),
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