exports.getFeaturedItems = ->
	a = [
		storeItems["SFJHS298"],
		storeItems["SFJHS290"],
		storeItems["SFJHS29X"]
		]

exports.flattenCategoriesWithItems = ->
	flatCats = {}
	for key , val of storeCategories
		flatCats[key] = {}
		for key2 , val2 of val 
			flatCats[key2] = {}
			for key3 , val3 of val2 when val2.id? isnt true
				flatCats[key3] = {}			

	
		for j,i of storeItems
			for cat in i.category
				flatCats[cat][j] = i if flatCats[cat]?
	return flatCats

exports.pack = (obj,payload) ->
	ct = {}
	for i in obj.cart
		item = root.storeItems[i]
		if ct[i]?
			ct[i].count++
		else
			ct[i] = item
			ct[i].count = 1
		ct[i].rx = ct[i].count * ct[i].price
		ct[i].total = acc.formatMoney(ct[i].count * ct[i].price)
		count = 0
	count = count+y.rx for x ,y of ct
		

	if count?
		apx = acc.formatMoney(count).replace('$','')
		apx = apx.replace('.','')

	obj.calc =
		products:ct
		total:acc.formatMoney(count)
		gst:acc.formatMoney(count*0.1)
		totalplus:acc.formatMoney(count*1.1)
		ini:payload
		rel:apx
	return obj
