export default defineEventHandler((event) => {
	return readBody(event).then(async (data) => {
	
		
		 await fetch(`https://dev-api.ewai.fr/subcategory/${parseInt(data.id)}`, {
			method: 'DELETE',
		});
	
		return "succesfully deleted new subcategory";
	});
});
