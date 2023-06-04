export default defineEventHandler((event) => {
	return readBody(event).then(async (data) => {

		// console.log(data.id)
	
		const response =  await fetch(`https://dev-api.ewai.fr/category/${parseInt(data.id)}`, {
			method: 'DELETE',
		});
		const responseData =  await response.text()
		console.log(responseData)
		
		return "succesfully deleted subcategory";
	});
});
