export default defineEventHandler(async (event) => {
	const token = getCookie(event, 'token');
	const form = await readMultipartFormData(event)

    const formData = new FormData();
    formData.append('file', new Blob([form[0].data], {type: form[0].type}), form[0].filename);

    const response = await $fetch(`https://auth-api.ewai.fr/subcategory/upload/${form[1].data}`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    const responseData = response
    return responseData;
});