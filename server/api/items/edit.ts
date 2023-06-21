export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	return readBody(event).then(async (data) => {
        const item=data
        const cid = item.category.id
        let scid
        if(item.subCategory) scid=item.subCategory.id
        else scid=-1;
        delete item.optionSet
        delete item.category
        delete item.subCategory
        delete item.sideItemSet
		const response = await fetch(`https://auth-api.ewai.fr/item/${parseInt(item.id)}/?categoryId=${parseInt(cid)}&subCategoryId=${parseInt(scid)}`, {
			method: 'PUT',
			body: JSON.stringify(item),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
        
		const responseData = await response.text();
		return responseData.split(" ")[2];
	});
});
