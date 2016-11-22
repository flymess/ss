/**
 * Created by Alex on 2016/9/12.
 */

module.exports = {
	appid: 'wxd84a057c5ec212c9',
	appsecret: '83ab4fc43b334594d8124ab6439f9ff7',
	mchid: ' ',
	token: 'Taidii',
	proxy: {
		Host: 'http://localhost:8080'
	},
	logic: {
		Host: 'localhost',
		Port: '8080'
	},
	API: {
		createOrUpdateUser:'/api/create-weixin-auth/',
		checkAuth: '/api/refresh-token'
	},
	redis: {
		port: '6379',
		host: '127.0.0.1'
	},
	domain: 'http://www.xingaokaowang.cn'
}