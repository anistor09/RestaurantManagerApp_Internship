export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	return readBody(event).then(async (data) => {
        const choice=data.choice
        const oid=data.id
        delete choice.id
		const response = await fetch(`https://auth-api.ewai.fr/choice/?optionId=${parseInt(oid)}`, {
			method: 'POST',
			body: JSON.stringify(choice),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
        
		const responseData = await response.text();
		return responseData.split(" ")[2];
	});
});