/**
 * Created by Alex on 16/7/28.
 */

var config = require('./config')

module.exports = {
	// 如果openId已经存在，则更新数据，返回http状态码200. 如果openId不存在，则创建一个新的用户,返回http状态码201
	createOrUpdateUser:'/api/create-weixin-auth/'
}