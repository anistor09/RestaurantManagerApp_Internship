export default defineEventHandler((event) => {
	// Reads the body of the event and returns a promise
	return readBody(event).then(async (data) => {
		// Sends a DELETE request to the specified URL with the parsed data ID
		 await fetch(`https://dev-api.ewai.fr/subcategory/${parseInt(data.id)}`, {
			method: 'DELETE',
		});
		// Returns a success message
		return "succesfully deleted new subcategory";
	});
});
