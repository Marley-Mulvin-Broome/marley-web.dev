export const sendDiscordWebhook = async (url: string, content: string) => {
	return await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			content
		}),
		method: 'POST'
	});
};
