<script lang="ts">
	interface Props {
		title: string;
		category: string;
		date: Date;
		slug: string;
	}

	let { title, category, date, slug }: Props = $props();
</script>

<a
	class="grid grid-cols-6 items-center w-full hover:bg-gray-600/20 rounded-md"
	href="/folders/articles/{slug}"
>
	<div class="col-span-3 flex flex-row items-center gap-2">
		<svg class="text-accent max-w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M7 17h7v-2H7zm0-4h10v-2H7zm0-4h10V7H7zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"
			/>
		</svg>

		{title}
	</div>

	<div class="col-span-2">
		{category}
	</div>

	<div class="col-span-1">
		{date.toLocaleDateString()}
	</div>
</a>
