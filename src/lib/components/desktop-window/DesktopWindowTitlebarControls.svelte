<script lang="ts">
	import TitlebarCircle from './TitlebarCircle.svelte';

	interface Props {
		onmaximize?: () => void;
	}

	let { onmaximize }: Props = $props();

	const handleClick = (e: MouseEvent, variant: 'close' | 'maximize' | 'minimize') => {
		if (variant !== 'maximize') return;

		e.preventDefault();
		onmaximize?.();
	};
</script>

<div class="flex flex-row gap-2 justify-center items-center bg-transparent px-4 py-3">
	{#snippet circle(variant, href)}
		<a
			{href}
			aria-label="{variant} Window"
			class="rounded-full"
			onclick={(e) => {
				handleClick(e, variant);
			}}
		>
			<TitlebarCircle {variant} />
		</a>
	{/snippet}

	{@render circle('close', '/')}
	{@render circle('minimize', '/')}
	{@render circle('maximize', '#')}
</div>
