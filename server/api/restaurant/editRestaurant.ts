export default defineEventHandler((event) => {
	readBody(event).then(async (data) => {
        console.log("sloboz");
        /*
		const response = await fetch(`https://dev-api.ewai.fr/restaurant/1`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
        console.log(response);*/
	});
});
