import type { SearchIndexItem } from './types';
import FlexSearch from 'flexsearch';

let searchIndex: FlexSearch.Index;
const searchIndexItemMap: Map<FlexSearch.Id, SearchIndexItem> = new Map();

export const createSearchIndex = (items: Iterable<SearchIndexItem>) => {
	searchIndex = new FlexSearch.Index({ tokenize: 'forward' });

	let id = 0;

	for (const item of items) {
		searchIndex.add(id, `${item.title} ${item.content}`);
		searchIndexItemMap.set(id, item);
		id++;
	}
};

export const search = async (query: string): Promise<SearchIndexItem[]> => {
	// escape regex characters in the query
	const match = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const results = await searchIndex.searchAsync(match);

	return results
		.map((result) => searchIndexItemMap.get(result))
		.filter((item) => item !== undefined)
		.map((item) => {
			return {
				...item,
				title: replaceTextWithMarker(item.title, match),
				content: getMatches(item.content, match).join('\n')
			};
		});
};

// Taken from https://joyofcode.xyz/blazing-fast-sveltekit-search#creating-the-search-index

function getMatches(text: string, searchTerm: string, limit = 1) {
	// create dynamic regex 😎
	const regex = new RegExp(searchTerm, 'gi');
	// word indexes
	const indexes = [];
	// matches count
	let matches = 0;
	// current match in loop
	let match;

	while ((match = regex.exec(text)) !== null && matches < limit) {
		// push that shit
		indexes.push(match.index);
		// increment matches
		matches++;
	}

	// take the word index...
	return indexes.map((index) => {
		// go back 20 characters
		const start = index - 20;
		// go forward 80 characters
		const end = index + 80;
		// yoink the text
		const excerpt = text.substring(start, end).trim();
		// return excerpt 🤝
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
	});
}

function replaceTextWithMarker(text: string, match: string) {
	// create dynamic regex 😎
	const regex = new RegExp(match, 'gi');
	// preserves the text casing 🤙
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}
