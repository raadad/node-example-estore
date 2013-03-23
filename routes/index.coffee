root = global ? window
root.ap = {} if !root.ap?


exports.index = (req,res) ->
	req.conf.link = {"/":"Home"}
	res.render 'index' , ax:req.conf ,displayItems:root.getFeaturedItems() , _:_ 

exports.cart = (req,res) ->
	req.conf.link = {"/":"Home",about:"Cart"}
	res.render 'cart' , ax:req.conf,  

exports.complete = (req,res) ->
	req.conf.link = {"/":"Home",about:"Complete"}
	res.render 'complete' , ax:req.conf,  
	root.store[req.session.id] = 
		sid: req.session.id
		count:0  unless  root.store[req.session.id]?
		cart:[]

exports.product_detail = (req,res) ->
	req.conf.link = {"/":"Home",products:"Products"}
	res.render 'product-detail' , ax:req.conf,  pr:root.storeItems[req.params.code]


exports.store = (req,res) ->
	req.conf.link = {"/":"Home",products:"Products"}
	res.render 'productMain' , ax:req.conf,displayItems:root.getFeaturedItems() , _:_


exports.search = (req,res) ->
	req.conf.link = {"/":"Home",search:"Search"}
	a = {}
	a[key] = val for key,val of storeItems when ~val.name.toLowerCase().indexOf(req.params.query.toLowerCase())
	a[key] = val for key,val of storeItems when ~val.product_description.toLowerCase().indexOf(req.params.query.toLowerCase())
	fk = a > 0
	res.render 'store' , ax:req.conf,  shoot:root.catmen ,displayItems:a , _:_

exports.category = (req,res) ->
	req.params.cat  = req.params.cat.replace /-/g," " if req.params.cat?
	req.params.cat2 = req.params.cat2.replace /-/g," " if req.params.cat2?
	req.params.cat3 = req.params.cat3.replace /-/g," " if req.params.cat3?

	req.conf.link = {"/":"Home",Products:"products","category/ase":req.params.cat}
	alx = req.params.cat if req.params.cat?
	alx = req.params.cat2 if req.params.cat2?
	alx = req.params.cat3 if req.params.cat3?
	categoryList = flattenCategoriesWithItems()[alx]
	categoryList = {} unless pox?
	fk = pox > 0
	res.render 'store' , ax:req.conf, displayItems:categoryList, _:_



