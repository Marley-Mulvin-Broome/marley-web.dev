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
				title: 'Jpfreq',
				href: '/folders/projects/jpfreq'
			}
		];
	});
</script>

<div class="flex flex-col items-center justify-center h-full px-20 py-4">
	<h1 class="text-3xl font-bold mb-2">
		{$t('common.jpfreq.title')}
	</h1>

	<p class="text-lg mb-4">
		{$t('common.jpfreq.description')}
	</p>

	<img src="/projects/jpfreq.png" alt="Home Call" class="w-full object-cover" />

	<ProjectLinksList
		links={[
			{
				type: 'github',
				url: 'https://github.com/Marley-Mulvin-Broome/JapaneseFrequencyProcessor'
			},
			{
				type: 'pypi',
				url: 'https://pypi.org/project/JPFreq/'
			}
		]}
	/>
</div>

<div class="w-full h-[2px] bg-gray-600 my-4"></div>

{#snippet h2(title: string)}
	<h2 class="text-2xl font-bold mb-4">
		{title}
	</h2>
{/snippet}

<div class="flex flex-col">
	{@render h2($t('common.jpfreq.description-title'))}

	<p class="text-lg mb-6">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html $t('common.jpfreq.description-content')}
	</p>

	{@render h2($t('common.jpfreq.tech-stack'))}

	<ul class="mb-4 list-disc pl-4 text-lg">
		<li>Python!!!</li>
	</ul>
</div>
