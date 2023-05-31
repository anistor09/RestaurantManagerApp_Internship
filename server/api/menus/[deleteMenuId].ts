export default defineEventHandler((event) => {
	$fetch(`https://dev-api.ewai.fr/carte/${event.context.params?.deleteMenuId}`, {
		method: 'DELETE',
	});
});
