export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
        const option=data
        delete option.choiceSet
		await fetch(`https://auth-api.ewai.fr/option/${parseInt(option.id)}/?id=${parseInt(option.id)}`, {
			method: 'PUT',
			body: JSON.stringify(option),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	});
});
