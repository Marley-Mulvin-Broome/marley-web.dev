<script lang="ts">
	import { locale, locales, t } from "$lib/translations";
import Avatar from "./Avatar.svelte";

  interface Props {
    img?: string;
    name?: string;
    title?: string;
  }

  const { img = '/marley.png', name = 'Marley Mulvin Broome' }: Props = $props();

	let windowWidth = $state(0);

	const localeClicked = (lang: string) => {
		$locale = lang;
		document.cookie=`lang=${lang} ; path=/; samesite=strict`;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

<header
	class="bg-primary-light w-full flex flex-row px-16 py-4 border-b border-gray-600"
>
	<nav class="flex flex-row justify-between items-center w-full">
		{#if windowWidth >= 1024}
			<a href="/folders/about-me" class="flex flex-row gap-2 items-center font-semibold text-lg tracking-wide text-transparent lg:text-white">
				<Avatar src={img} alt="Marley" width={32} height={32} />
				{name}
			</a>
		{:else}
			<a href="/" class="text-accent font-bold">
				Home
			</a>
		{/if}

		<div
			class="flex flex-col lg:flex-row gap-2 items-center"
		>

			{#each $locales as supportedLocale}
				<button onclick={() => { localeClicked(supportedLocale) }} class="text-sm text-gray-400 data-[selected=true]:font-bold data-[selected=false]:underline cursor-pointer" data-selected={$locale === supportedLocale}>
					{$t(`lang.${supportedLocale}`)}
				</button>
			{/each}
		</div>
		
	</nav>
</header>
