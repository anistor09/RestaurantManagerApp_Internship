export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	return readBody(event).then(async (data) => {
        const option=data.option
        const rid=data.id
        delete option.id
        delete option.choiceSet
		const response = await fetch(`https://auth-api.ewai.fr/option/?restaurantId=${parseInt(rid)}`, {
			method: 'POST',
			body: JSON.stringify(option),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await response.text();
		return responseData.split('\'')[1];
	});
});
