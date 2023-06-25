export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	$fetch(`https://auth-api.ewai.fr/carte/${event.context.params?.deleteMenuId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return "ok";
});
