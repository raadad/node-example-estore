##################################################################
#entry.coffee - Server side  entry point
###################################################################
Array::remove = (e) -> @[t..t] = [] if (t = @indexOf(e)) > -1

root = global ? window
root.ap = {} if !root.ap?


root.express = require('express')

root.http = require('http')
root.acc = require('accounting')
root.short = require('shortid')
root._ = require('underscore')
root.uuid = require('node-uuid')

root.routes = require('./server/routes')
root.storeItems = require("./server/data").items
root.storeCategories = require("./server/data").categories
root.logic = require('./server/application')
root.meth = require("./server/sockets")
#################################
# Initilizing Web Server
#################################
root.app = express()
root.server = http.createServer(app)
root.sio = require('socket.io')
root.io = sio.listen(server)
root.io.set 'transports',['xhr-polling','jsonp-polling','htmlfile','flashsocket']



#################################
#Setting up environment
#################################
root.suffix  = process.argv[2]
root.env  = process.argv[3]
root.suffix ?="/"
root.env	?="dev"



##################################
#Configuring resoruces
##################################
app.configure ->
	app.set 'views', "#{__dirname}/views"
	app.set 'view engine', 'jade'
	app.use express.favicon()
	app.use express.logger('dev')

	if env == "prod"
		app.use "#{suffix}",express.static(__dirname + '/build')
	else
		app.use "#{suffix}js" ,express.static(__dirname + '/private/js')
		app.use "#{suffix}cs" ,express.static(__dirname + '/private/cs')

	app.use "#{suffix}" ,express.static(__dirname + '/public/')
	app.use "#{suffix}app" ,express.static(__dirname + '/app/')
	app.use "#{suffix}images" ,express.static(__dirname + '/public/img')
	app.use express.bodyParser()
	app.use express.methodOverride()
	app.use express.cookieParser("ftp");
	app.use express.session secret:"ftp"
	app.use routes.prepare
	


	app.use app.router




app.configure 'development', ->
	app.use express.errorHandler()


app.get "#{suffix}", routes.index
app.get "#{suffix}cart", routes.cart
app.get "#{suffix}complete", routes.complete
app.get "#{suffix}products", routes.store
app.get "#{suffix}products/:code?/:code2?/:code3?" ,routes.product_detail
app.get "#{suffix}search/:query?",routes.search
app.get "#{suffix}category/:cat?/:cat2?/:cat3",routes.category
app.get "#{suffix}store" ,routes.store

root.store = {}

io.sockets.on 'connection' , (socket,a,b,c) ->
		socket.on 'comm' , (sid,method,payload) ->
			console.log sid,method,payload
			if root.store[sid]
				root.meth[method](socket,root.store[sid],payload)






###################################
#Firing up application server
###################################


if env == "prod"
	server.listen 3214
	console.log "Running #{env} on port 3214"

else if env == "show"
	server.listen 80
	console.log "Running #{env} on port 80"
else
	server.listen 3000
	console.log "Running #{env} on port 3000"
