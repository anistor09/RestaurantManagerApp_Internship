export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	// Reads the body of the event and returns a promise
	return readBody(event).then(async (data) => {
		// Sends a DELETE request to the specified URL with the parsed data ID
		await fetch(`https://auth-api.ewai.fr/category/${parseInt(data.id)}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Returns a success message
		return "succesfully deleted subcategory";
	});
});
