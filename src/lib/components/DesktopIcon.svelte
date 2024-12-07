<script lang="ts">
 interface Props {
    name: string;
    type: 'file' | 'folder';
    href?: string;
 }

 const { name, type, href = '#' }: Props = $props();

</script>

<a
 class="flex flex-col gap-1 justify-center p-2 items-center w-[120px] h-fit cursor-pointer rounded-md hover:outline-gray-600 hover:bg-gray-600/20 hover:outline hover:outline-1 text-accent"
 href={href}
>
   {#if type === 'file'}
      <svg class="w-[60px] h-[60px] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
         <path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34M332.1 128H256V51.9zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288z" />
      </svg>

   {:else if type === 'folder'}
      <svg class="w-[60px] h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="currentColor" d="M216 72h-84.69L104 44.69A15.88 15.88 0 0 0 92.69 40H40a16 16 0 0 0-16 16v144.62A15.41 15.41 0 0 0 39.39 216h177.5A15.13 15.13 0 0 0 232 200.89V88a16 16 0 0 0-16-16M40 56h52.69l16 16H40Z" />
   </svg>
   {/if}

   <span
      class="font-semibold text-xl"
   >
      {name}

   </span>
</a>
