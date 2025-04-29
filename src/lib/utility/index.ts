export * from './eventUtil';
export * from './mathUtil';

export const copyArray = <T>(array: T[]): T[] => {
	return array.slice();
};
