export const stopPropagation = (fn?: (event: Event) => void) => {
	return (event: Event) => {
		event.stopPropagation();
		fn?.(event);
	};
};
