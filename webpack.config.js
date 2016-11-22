/**
 * Created by tao on 2016/11/22.
 */
if(process.env.NODE_ENV === 'production'){
	module.exports = require('./webpack.config.prod')
}else{
	module.exports = require('./webpack.config.dev')
}
