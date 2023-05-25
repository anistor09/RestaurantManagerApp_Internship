export default defineEventHandler((event) => {
	$fetch(`https://dev-api.ewai.fr/table/${event.context.params?.deleteTableId}`, {
		method: 'DELETE',
	});
});
