<script lang="ts">
	import { breadcrums } from '$lib';
	import ProjectItem from '$lib/components/desktop-window/ProjectItem.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { t } from '$lib/translations';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		windows.breadcrums = breadcrums.projects;
	});
</script>

<Meta
	title={$t('common.meta.projects.title')}
	description={$t('common.meta.projects.description')}
	image={$t('common.meta.projects.image')}
/>

<div
	class="flex flex-row flex-wrap gap-4 items-center pt-8 justify-center lg:justify-between lg:px-4"
>
	{#snippet project(title: string, href: string, img: string)}
		<ProjectItem {title} {href} {img} />
	{/snippet}

	{@render project(
		$t('common.projects.home-call'),
		'/folders/projects/home-call',
		'/projects/home-call.png'
	)}

	{@render project($t('common.projects.omnia'), '/folders/projects/omnia', '/projects/omnia.png')}
	{@render project(
		$t('common.projects.jpfreq'),
		'/folders/projects/jpfreq',
		'/projects/jpfreq.png'
	)}
	{@render project(
		$t('common.projects.electron-timer'),
		'/folders/projects/electron-timer',
		'/projects/electron-timer.png'
	)}
	{@render project(
		$t('common.projects.short-it'),
		'/folders/projects/short-it',
		'/projects/penguin.gif'
	)}
	{@render project($t('common.projects.other'), '/folders/projects/other', '/projects/other.png')}
</div>
