<script lang="ts">
	interface Props {
		icon: string;
		overwriteColours?: boolean;
		overwriteDimensions?: boolean;
		width?: number;
		height?: number;
		class?: string;
	}

	const {
		icon,
		overwriteColours = false,
		overwriteDimensions = false,
		class: classes = '',
		width = 24,
		height = 24
	}: Props = $props();

	const getSvgContent = async (icon: string) => {
		const response = await fetch(icon);
		let svgText = await response.text();

		if (overwriteColours) {
			svgText = svgText
				.replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
				.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
		}

		if (overwriteDimensions) {
			svgText = svgText
				.replace(/width="(?!none)[^"]*"/g, `width="${width}"`)
				.replace(/height="(?!none)[^"]*"/g, `height="${height}"`);
		}

		return svgText;
	};
</script>

{#if icon.includes('/') && icon.includes('.svg')}
	<div class={classes} style="width: {width}px; height: {height}px;">
		{#await getSvgContent(icon) then svgContent}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html svgContent}
		{/await}
	</div>
{:else if icon.includes('/') && icon.includes('.png')}
	<img src={icon} alt="icon" style="width: {width}px; height: {height}px;" class={classes} />
{/if}
