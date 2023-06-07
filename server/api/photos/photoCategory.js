export default defineEventHandler(async (event) => {
	const token = getCookie(event, 'token');
	const body = await readBody(event)
    const formData = new FormData();
    formData.append('file', body);
    const response = await fetch(`https://auth-api.ewai.fr/category/upload/14`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    const responseData = await response.json();
    console.log(responseData)
    return responseData;
});