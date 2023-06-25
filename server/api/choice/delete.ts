export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
		await fetch(`https://auth-api.ewai.fr/choice/${parseInt(data)}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	});
	return "ok";
});
