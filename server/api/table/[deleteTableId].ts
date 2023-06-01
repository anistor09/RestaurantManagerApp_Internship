export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	$fetch(`https://auth-api.ewai.fr/table/${event.context.params?.deleteTableId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
});
