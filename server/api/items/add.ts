export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	return readBody(event).then(async (data) => {
        const item=data.item
        const rid=data.id
        const cid = item.category.id
        let scid
        if(item.subCategory) scid=item.subCategory.id
        else scid=-1;
        delete item.id
        delete item.optionSet
        delete item.category
        delete item.subCategory
        delete item.sideItemSet
		const response = await fetch(`https://auth-api.ewai.fr/item/?restaurantId=${parseInt(rid)}&categoryId=${parseInt(cid)}&subCategoryId=${parseInt(scid)}`, {
			method: 'POST',
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
