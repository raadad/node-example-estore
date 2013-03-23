root = global ? window
root.ap = {} if !root.ap?



exports.validate = (socket,obj,payload) ->
		console.log "valid"
		obj.cpr = payload
		message = "There is an error with the following field:"
		mx = []
		mx.push ["#first","#{message} First Name \n"] if payload.first.length < 3
		mx.push ["#last","#{message} Last Name \n"] if payload.last.length < 3
		mx.push ["#contact","#{message} Contact Number \n"] if payload.contact.length < 4
		mx.push ["#addr1","#{message} Address line 1 \n"] if payload.addr1.length < 2
		mx.push ["#addr2","#{message} Address line 2 \n"] if payload.addr2.length < 2

		if payload.card == true
			mx.push ["#post","#{message} Post Code \n"] if payload.post.length < 4
			mx.push ["#state","#{message} State \n"] if payload.state.length < 3
			mx.push ["#expN","#{message} Name On Card \n"] if payload.expN.length < 3
			mx.push ["#expC","#{message} Card Number \n"] if payload.expC.length < 3
			mx.push ["#expS","#{message} Security Code \n"] if payload.expS.length < 3
		if mx.length > 0
			socket.emit "error", mx
		else if obj.cart.length == 0
			socket.emit "error", [[null, "You have nothing in your cart, pleas add some items to continue"]]
		else
			root.meth.lock(socket,obj)
			obj.trans = short.generate()
			payload.trans = obj.trans
			socket.emit "goahead" ,root.pack(obj,payload)


exports.unlock = (socket,obj) ->
		obj.lock = false
		root.meth.updateCart(socket,obj,"Your cart has been unlocked, you can now make changes")

exports.lock =  (socket,obj,payload) ->
		obj.lock = true
		root.meth.updateCart socket,obj,"Your shopping cart has been locked, you can no longer add to the cart untill payment is successful or cancelled"

exports.add =  (socket,obj,payload) ->
		if obj.lock
			root.meth.updateCart socket,obj,"Cannot add to cart as your cart is locked"
		else
			obj.cart.push payload
			root.meth.updateCart socket,obj,"1x #{root.storeItems[payload].name} was successfully added to your cart."
exports.remove = (socket,obj,payload) ->
		if obj.lock
			root.meth.updateCart socket,obj,"Cannot remove from cart as your cart is locked"
		else
			obj.cart.remove(payload)
			root.meth.updateCart socket,obj,"1x #{root.storeItems[payload].name} was successfully removed from your cart."
exports.updateCart = (socket,obj,payload) ->
		socket.emit 'updateCart',root.logic.pack(obj,payload).calc

exports.login = (socket,obj,payload) ->
		socket.emit 'lfail'
		root.meth.updateCart(socket,obj,"Login Failed")