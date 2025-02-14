<script lang="ts">
	interface Props {
		title: string;
		href: string;
		img: string;
	}

	let { title, href, img }: Props = $props();
</script>

<a
	{href}
	class="flex flex-col gap-2 items-center text-center w-[200px] h-[200px] border-gray-600 rounded-md hover:bg-gray-600/20"
>
	<img src={img} alt="{title} project" class="w-full h-full rounded-md object-cover" />

	<p>
		{title}
	</p>
</a>
