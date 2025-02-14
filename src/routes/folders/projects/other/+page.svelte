<script lang="ts">
	import { breadcrums } from '$lib';
	import ProjectLinksList from '$lib/components/ProjectLinksList.svelte';
	import { t } from '$lib/translations';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		windows.fullscreen = true;

		windows.breadcrums = [
			...breadcrums.projects,
			{
				title: 'Other',
				href: '/folders/projects/other'
			}
		];
	});
</script>

<div class="flex flex-col items-center justify-center h-full px-20 py-4">
	<h1 class="text-3xl font-bold mb-2">
		{$t('common.other.title')}
	</h1>

	<p class="text-lg mb-4">
		{$t('common.other.description')}
	</p>

	<video defaultmuted playsinline muted autoplay loop class="rounded-md">
		<source src="/projects/plantopia.webm" type="video/webm" />
		<track kind="captions" />
	</video>
</div>

<div class="w-full h-[2px] bg-gray-600 my-4"></div>

{#snippet h2(title: string)}
	<h2 class="text-2xl font-bold mb-4">
		{title}
	</h2>
{/snippet}

<div class="flex flex-col">
	{@render h2($t('common.other.plantopia-title'))}

	<p class="text-lg mb-6">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{$t('common.other.plantopia-content')}

		<img class="pt-4" src="/projects/plantopia.png" alt="plantopia" />
	</p>

	{@render h2($t('common.other.shousetu-title'))}

	<p class="text-lg">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html $t('common.other.shousetu-content')}
	</p>

	<ProjectLinksList
		class="mb-6"
		links={[
			{
				type: 'github',
				url: 'https://github.com/Marley-Mulvin-Broome/ShousetsukaScraper'
			}
		]}
	/>

	{@render h2($t('common.other.svelte-share-title'))}
	<p class="text-lg">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{$t('common.other.svelte-share-content')}
	</p>

	<ProjectLinksList
		class="mb-6"
		links={[
			{
				type: 'github',
				url: 'https://github.com/Marley-Mulvin-Broome/svelte-share-button'
			}
		]}
	/>
</div>
