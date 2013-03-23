root = global ? window
root.ap = {} if !root.ap?

class ttl extends Backbone.View
	initialize: ->
		@model = {}
		@model.products = {}
		@render()

	render: =>
		console.log @model
		html = """
			<tr class="shipping">
				<th> <strong>Shipping</strong>Australia</th>

				<td>Free Shipping <input id="shipping_method" name="shipping_method" type="hidden" value="#{@model.total}"></td> 
			</tr>
			<tr class="total alt-table-row">
				<th><strong>Subtotal</strong></th>
				<td>
					<strong>
						<span class="amount">#{@model.total}</span>
					</strong>
				</td>
			</tr>
			<tr class="total alt-table-row">
				<th><strong>% 10 GST</strong></th>

				<td>
					<strong>
						<span class="amount"></span>
					</strong>				
					<strong>
						<span class="amount">#{@model.gst}</span>
					</strong>
				</td>
			</tr>
			<tr class="total alt-table-row">
				<th><strong>Order Total (AUD)</strong></th>

				<td>
					<strong>
						<span class="amount">#{@model.totalplus}</span>
					</strong>
				</td>
			</tr>						
			</tbody>
			"""
		$("#hTotal").html(html)


class dCart extends Backbone.View
	initialize: ->
		@model = {}
		@model.products = {}
		@render()

	render: =>
		console.log @model
		html = """ """
		for x ,p of @model.products
			html = """
				#{html}
				<li class="cart-product">
					<a href="/cart/">
						<img src="http://dummyimage.com/40x40/000000/f0f0f0.jpg&text=#{p.name}">
						#{p.name}
					</a>
					<span class="quantity">
						#{p.count} × 
						<span class="amount">$#{p.price}</span>
					</span>
				</li>
			    """
		html = """
			#{html}
            <li class="total">
            	<div class="total-block">
            		<strong>Subtotal:</strong>
            		<span class="amount">#{@model.total}</span>
            	</div>
            </li>

            <li class="buttons">
            	<a href="/cart" class="checkout">
            		<span>Checkout →</span>
            	</a>            	
            	<a onclick="$('#resetModal').modal()" href="#" class="s">
            		<span>Reset Cart →</span>
            	</a>

            </li>


            </ul> 
			"""
		$("#dcart").html(html)


class hCart extends Backbone.View
	initialize: ->
		@model = {}
		@model.products = {}
		@render()

	render: =>
		console.log @model
		html = """

			"""
		for x ,p of @model.products
			html = """
				#{html}
			<tr>
				<td class="product-thumbnail">
					<a href=""><img src="http://dummyimage.com/40x40/000000/f0f0f0.jpg&text=#{p.name}"></a>
					</td><td class="product-name"><a href="#">#{p.name}</a>Product
					</td><td class="product-price"><span class="amount">$#{p.price}</span>
					</td><td class="product-quantity">
						<div class="quantity">
						<input onclick="comm('remove','#{p.sku}');" id="minus1" type="button" value="-" class="minus">
						<input disabled data-max="0" data-min="" maxlength="12" size="4" title="Qty" value="#{p.count}" class="input-text qty text">
						<input onclick="comm('add','#{p.sku}');" id="add1" type="button" value="+" class="plus">
						</div>
					</td><td class="product-subtotal"><span class="amount">#{p.total}</span>
				</td>
			</tr>
			    """
		html = """
			#{html}
			"""
		$("#hCart").html(html)

class quickCart extends Backbone.View
	initialize: ->
		@model = {}
		@model.products = {}
		@render()

	render: =>
		console.log @model
		html = """
		    <ul class='cart-list product-list'>
			"""
		for x ,p of @model.products
			html = """
				#{html}
				<li>
                	<a href="#">
               	    	#{p.name}
                	</a>
                	<span style="font-weight:normal;" class="amount">Each: $#{p.price}</span>
					<div class="quantity" style="padding: 0px; background-color:#F3F3F3;">
						
						<input style="padding:5px 5px 5px 5px" disabled data-max="0" data-min="0" maxlength="12" size="4" title="Qty" value="Qty:" class="input-text qty text">
						<input onclick="comm('remove','#{p.sku}');" style="padding:5px 5px 5px 5px" id="minus1" type="button" value="-" class="minus">
						<input style="padding:5px 5px 5px 5px; width:30px;" disabled data-max="0" data-min="0" maxlength="12" size="4" title="Qty" value="#{p.count}" class="input-text qty text">
						<input onclick="comm('add','#{p.sku}');" style="padding:5px 5px 5px 5px" id="add1" type="button" value="+" class="plus">
					</div>                 		
                 	<span style="font-weight:normal;" class="amount">Subtotal: #{p.total}</span>

                	</span>
              	</li>
			    """
		html = """
			#{html}
		  	</ul>  
		  	<p class="total">
              <strong>Subtotal:</strong>
              <span class="amount">#{@model.total}</span>
            </p>
			<p class="buttons">
              <a class="checkout" href="/cart">
                <span>Checkout →</span>
              </a>
              <a class="cart" onclick="$('#resetModal').modal()" >
                <span>Reset Cart →</span>
              </a>              
            </p>
			"""
		$("#quickCart").html(html)

	root.comm = (method,object) ->
		socket.emit "comm",sid,method,object


	root.card = (ak) ->
		hax = """
<div class="bs-docs-example form-horizontal">
   <legend>#{ak}</legend>
   <div class="control-group">
      <label class="control-label" for="inputEmail"> Name On Card</label>
      <div class="controls">
         <input id="expN"type="text" id="inputEmail" placeholder="Name On Card" />
      </div>
   </div>
   <div class="control-group">
      <label class="control-label" for="inputPassword">Card Number</label>
      <div class="controls">
         <input id="expC" "type="text" id="inputPassword" placeholder="Card Number" />
      </div>
   </div>
</div>
<div class="form-horizontal">
   <div style="float:left;" class="control-group">
      <label class="control-label">Card Expiry</label>
      <div class="input">
         <div class="controls">
            <select id="expM" type="text" placeholder="First" class="span1">
               <option>01</option>
               <option>02</option>
               <option>03</option>
               <option>04</option>
               <option>05</option>
               <option>06</option>
               <option>07</option>
               <option>08</option>
               <option>09</option>
               <option>10</option>
               <option>11</option>
               <option>12</option>
            </select>
            /
         </div>
      </div>
   </div>
   <div class="control-group">
      <div class="input">
         <div class="controls">
            <select id="expY" type="text" placeholder="last" class="span1">
               <option>12</option>
               <option>13</option>
               <option>14</option>
               <option>15</option>
               <option>16</option>
               <option>17</option>
               <option>18</option>
               <option>19</option>
               <option>20</option>
               <option>21</option>
               <option>22</option>
               <option>23</option>
            </select>
         </div>
      </div>
   </div>
	<div class="control-group">
	   <label class="control-label" for="inputEmail"> Security Code (CCV)</label>
	   <div class="controls">
	      <input type="text" id="expS" placeholder="Security Code (CCV)" />
	   </div>   
	</div>
	<button onclick="check('#{ak}',true);" id="checker">procceed to payment</button>

</div>    
		"""
		$("#restof").html(hax)


root.handleKeyPress = (event,query) ->
	console.log event
	key = event.keyCode || event.which;
	root.search(query) if key ==13


root.search = (query)->
	window.location = "/search/#{query}"


root.commit = (typ) ->
	root.comm "checkout"
	console.log "chikety check"
	$("#errorx").removeClass("alert-error")
	$("#errorx").addClass("alert-info")
	$("#errorx").html("Please wait while we process your payment")
	$("#checker").attr("disabled","disabled")
	root.comm "lock", null

root.check =  (typ,lap) ->
	console.log "madcnt"
	$('#first').css("background-color", "#FFF")
	$('#last').css("background-color", "#FFF")
	$('#contact').css("background-color", "#FFF")
	$('#bname').css("background-color", "#FFF")
	$('#abn').css("background-color", "#FFF")
	$('#addr1').css("background-color", "#FFF")
	$('#addr2').css("background-color", "#FFF")
	$('#post').css("background-color", "#FFF")
	$('#expN').css("background-color", "#FFF")
	$('#expC').css("background-color", "#FFF")
	$('#expM').css("background-color", "#FFF")
	$('#expY').css("background-color", "#FFF")
	$('#expS').css("background-color", "#FFF")
	$('#state').css("background-color", "#FFF")
	$("#errorx").html("")

	payload =
		first:$('#first').val()
		last:$('#last').val()
		contact:$('#contact').val()
		bname:$('#bname').val()
		abn:$('#abn').val()
		addr1:$('#addr1').val()
		addr2:$('#addr2').val()
		post:$('#post').val()
		expN:$('#expN').val()
		expC:$('#expC').val()
		expM:$('#expM').val()
		expY:$('#expY').val()
		expS:$('#expS').val()
		state:$('#state').val()
		method:$('#method').html()				
		type:typ
		card:lap
	root.comm("validate",payload)

$ ->
	NotifierjsConfig.defaultTimeOut = 2000;
	root.sid = $("#sess").attr('content')
	root.socket = io.connect()

	socket.on "completed", ->
		console.log "sale Completed"
		window.location = "/complete"

	socket.on "error" , (payload) ->
		console.log payload
		for x in payload
			$(x[0]).css("background-color","#FDD") 
			Notifier.notify(x[1]) if payload?

	socket.on "updateCart" , (payload) ->
		console.log payload
		root.list.model = payload
		root.jist.model = payload
		root.apple.model = payload
		root.flap.model = payload
		root.list.render()
		root.jist.render()
		root.apple.render()
		root.flap.render()
		Notifier.notify(payload.ini) if payload.ini?

	socket.on "transFail", (payload) ->
		console.log "woowhoo"
		$("#errorx").html("The payment details you provided were not accepted, please check your details and try again")
		Notifier.notify("Your Payment Method Was Not Accepted")
		$("#checker").removeAttr("disabled")
		$("#errorx").removeClass("alert-info")
		$("#errorx").addClass("alert-error")
		root.comm "unlock", null

	socket.on "lfail", (payload) ->
		$("#logz").html("This has not been implemented, It sends your details to the server, but does nothing with it")
		

	socket.on "goahead", (payload) ->
		html =
			"""
			<label>Your are purchasing the following</label>
			<label><strong>Items:  </strong></label>
			<ul>
			"""

		console.log payload.products
		console.log payload
		for k,s of payload.calc.products
			html = "#{html}
				<li>#{s.count} x [#{s.product_code}] #{s.name} @ #{s.price} </li>
			"
		html = "#{html} </ul>

		<label><strong>Subtotal</strong>#{payload.calc.total}</label>
		<label><strong>10% GST: </strong>#{payload.calc.gst}</label>
		<label><strong>Order Total: </strong>#{payload.calc.totalplus}</label>
		"
		console.log html
		$("#finalCart").html(html)
	
		if payload.cpr.type == "bank"
			console.log "lol"
			$("#commitx").attr("style","visibility:visibile")
			$("#payment").html("""
				<br><br><label> <strong>You have chosen to pay for this via a bank deposit,Our bank details are as follows:          </strong></label><br><label> <strong>BSB:</strong>123123123</label><label><strong>ACC:</strong>213123124</label><label> 
Please use the following number as a description of the bank deposit, so we can identify your deposit:</label><label> <strong>Number:</strong>#{payload.trans}          </label><label>Payment must be made within 30 days of purchase, if no payment is made your sale will be abandond.</label>

				""")
		if payload.cpr.type == "pickup"
			console.log "www"
			#$("#commitx").attr("style","visibility:visibile")
			$("#payment").html("""
				<div id="payment"><br><br><label> <strong>You have chosen to pay for this when you come to pick it up, our address is as follows:          </strong></label><br><label> 
				Shop 2 - 164-166 Parramatta Rd  , Granville , NSW</label><br><label>Payment must be made within 30 days of purchase, if no payment is made your sale will be abandoned.</label></div>
			""")
		else
			#$("#commitx").attr("style","visibility:visibile")
			$("#payment").html("""
				<div id="payment">Please allow a maximum of 10 business days for your order to arrive, however most orders are shipped next business day so will only take that long in rare circumstances</label></div>
			""")
		if payload.cpr.type == "paypal"
			#$("#commitx").attr("style","visibility:hidden")


			html = """<form action='https://www.sandbox.paypal.com/cgi-bin/webscr' method='post'>
					<input type='hidden' name='cmd' value='_cart'>
					<input type='hidden' name='upload' value='1'>
					<input type='hidden' name='business' value='biz_1356347975_biz@envetta.com.au'>		
					"""
			cn = 0
			
			for i , l of root.jist.model.products
				cn++
				html = "#{html} 
					<input type='hidden' name='item_name_#{cn}' value='#{l.name}'>
					<input type='hidden' name='quantity_#{cn}' value='#{l.count}'>
					<input type='hidden' name='amount_#{cn}' value='#{l.price}'>
				"
			html = "#{html}
					<input type='hidden' name='currency_code' value='AUD'>
 					<input type='hidden' name='tax_cart' value='#{jist.model.gst}'>
					<button onclick='console.logd' type='submit' value='PayPal'><img src='/images/hero.png'/> </button>
				</form>"
			$("#commox").html(html)			
		$('#myModal').modal()

	$('#myModal').on 'hide' , ->
		console.log "awesome"
		root.comm "unlock", null

	root.list = new quickCart el:"quickCart"
	root.jist = new dCart el:"dcart"
	root.apple = new hCart el:"hCart"
	root.flap = new ttl el:"hTotal"
	console.log "done"
	root.comm "updateCart", null 