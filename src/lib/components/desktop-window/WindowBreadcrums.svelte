<script lang="ts">
	import type { Breadcrum } from "$lib/types";

  interface Props {
    breadcrums: Breadcrum[];
  }

  let { breadcrums }: Props = $props();

  const getLink = (item: Breadcrum, i: number) => {
    if (i === breadcrums.length - 1) {
      return "javascript:void(0)";
    }

    return item.href;
  };
</script>

<div
  class="flex flex-row gap-2 items-center text-gray-400"
>
  {#each breadcrums as item, i}
    <a href={getLink(item, i)} class="data-[clickable=true]:hover:underline data-[clickable=false]:cursor-default line-clamp-1 max-w-[100px] lg:max-w-none" data-clickable={i !== breadcrums.length - 1}>
      {item.title}
    </a>

    {#if i !== breadcrums.length - 1}
      <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z" />
      </svg>
    {/if}
  {/each}
</div>