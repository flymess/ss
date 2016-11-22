/**
 * Created by Alex on 16/5/20.
 */

if(process.env.NODE_ENV === 'production'){
	console.log('production')
	module.exports = require('./config.prod')
}
else{
	console.log('dev')
	module.exports = require('./config.dev')
}
