<script lang="ts">
	import { breadcrums } from '$lib';
	import { t } from '$lib/translations';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		windows.breadcrums = [
			...breadcrums.projects,
			{
				title: 'Short It',
				href: '/folders/projects/short-it'
			}
		];

		windows.fullscreen = true;
	});
</script>

<div class="flex flex-col items-center justify-center h-full px-20 py-4">
	<h1 class="text-3xl font-bold mb-2">
		{$t('common.short-it.title')}
	</h1>

	<p class="text-lg mb-4">
		{$t('common.short-it.description')}
	</p>

	<img src="/projects/penguin.gif" alt="Short It" class="w-full" />

	<p class="pt-1">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html $t('common.short-it.interested')}
	</p>
</div>

<div class="w-full h-[2px] bg-gray-600 my-4"></div>

{#snippet h2(title: string)}
	<h2 class="text-2xl font-bold mb-4">
		{title}
	</h2>
{/snippet}

{#snippet h3(title: string)}
	<h3 class="text-xl font-semibold mb-2">
		{title}
	</h3>
{/snippet}

<div>
	{@render h2($t('common.short-it.tech-stack'))}

	<p class="text-lg mb-6">
		{$t('common.short-it.tech-stack-description')}
	</p>

	{@render h3($t('common.short-it.technologies'))}

	<ul class="mb-4 list-disc pl-4">
		<li>SvelteKit</li>
		<li>Tailwind CSS</li>
		<li>Golang</li>
		<li>Goose</li>
		<li>Gin</li>
		<li>Sqlc</li>
		<li>PostgreSQL</li>
		<li>Firebase Authentication</li>
		<li>Stripe</li>
		<li>fly.io</li>
	</ul>
</div>
