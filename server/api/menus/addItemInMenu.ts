export default defineEventHandler((event) => {
	readBody(event).then(async (data) => {
        console.log(JSON.stringify(data))
        const carteId = data.carteId;
        const itemId = data.itemId;
		const response = await fetch(`https://dev-api.ewai.fr/carte/additem?itemId=${itemId}&carteId=${carteId}`, {
			method: 'POST',
			body: "",
			headers: {
				'Content-Type': 'application/json',
			},
		});
        console.log(response);
	});
});
