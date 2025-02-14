import type { Breadcrum, SupportedIcons } from './types';

interface DesktopWindow {
	href: string;
	/**
	 * Whether the window matches with the current URL and should be considered 'selected'.
	 */
	match: RegExp;
	icon: SupportedIcons;
	title: string;
	pin: boolean;
}

type SupportedLanguages = 'en' | 'ja';

interface WindowsData {
	windows: DesktopWindow[];
	fullscreen: boolean;
	breadcrums: Breadcrum[];
	language: SupportedLanguages;
}

export const windows: WindowsData = $state({
	windows: [
		{
			href: '/folders/contact',
			match: /^\/folders\/\/contact$/,
			icon: 'mail',
			title: 'Contact',
			pin: true
		}
	],
	breadcrums: [],
	fullscreen: false,
	language: 'en'
});
