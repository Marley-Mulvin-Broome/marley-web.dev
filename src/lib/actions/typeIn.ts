import type { Writable } from "svelte/store";

interface TypeInOptions {
  interval?: number,
  blinking?: Writable<boolean>
}

export const typeIn = (
  node: HTMLElement,
  options?: TypeInOptions,
) => {
  const { interval = 100, blinking } = options || {};

  const text = node.textContent || ' ';

  node.textContent = ' ';

  let index = 0;

  blinking?.set(false);

  const intervalId = setInterval(() => {
    node.textContent = text.slice(0, index + 1);

    index++;
    

    if (index === text.length) {
      clearInterval(intervalId);
      blinking?.set(true);
      console.log("BLINK NOW!")
    }
  }, interval);

  return {
    destroy() {
      clearInterval(intervalId);
    },
  };
}