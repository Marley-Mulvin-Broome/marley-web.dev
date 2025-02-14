<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		class?: string;
	}

	let { src, alt, width = 32, height = 32, class: classes }: Props = $props();
</script>

<img class={'object-cover rounded-full ' + classes} {src} {alt} {width} {height} />
