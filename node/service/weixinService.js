/**
 * Created by Alex on 16/7/28.
 */

var OAuth=require('wechat-oauth'),
		config = require('../config'),
	  API = require('wechat-api'),
	  api = config.API,
	  http = require('http'),
		redis = require('redis'),
		Q = require('q');

// var client = new OAuth(config.appid, config.appsecret)
// var wechatAPI = new API(config.appid, config.appsecret)

var redisClient = redis.createClient({
	retry_strategy: function (options) {
		// if (options.error && options.error.code === 'ECONNREFUSED'){
		// 	return new Error('The server refused the connection');
		// }
		if (options.total_retry_time > 1000*60*5) {
			// End reconnecting after a specific timeout and flush all commands with a individual error
			return new Error('Retry time exhausted');
		}
		if (options.times_connected > 10) {
			// End reconnecting with built in error
			return undefined;
		}
		// reconnect after
		return Math.max(options.attempt * 100, 3000);
	}
});

redisClient.on('error', function (err) {
	console.log(err)
})

var client = new OAuth(config.appid, config.appsecret)
var wechatAPI = new API(config.appid, config.appsecret)
// var client = new OAuth(config.appid, config.appsecret, function (unionId, callback) {
// 	redisClient.get(unionId + ':access_token', function (err, reply) {
// 		if(err){return callback('500', reply)}
// 		callback(null, JSON.parse(reply));
// 	});
// }, function (unionId, token, callback) {
// 	redisClient.set(unionId + ':access_token', JSON.stringify(token), function (err, reply) {
// 		if(err){return callback('500', reply)}
// 		callback(null, reply);
// 		redisClient.expire(unionId +':access_token', 7200);
// 	});
// });

// var wechatAPI = new API(config.appid, config.appsecret, function (callback) {
// 	redisClient.get('access_token', function (err, reply) {
// 		if(err){return callback('500', reply)}
// 		callback(null, JSON.parse(reply));
// 	});
// }, function (token, callback) {
// 	redisClient.set('access_token', JSON.stringify(token), function (err, reply) {
// 		if(err){return callback('500', reply)}
// 		callback(null, reply);
// 		redisClient.expire('access_token', 7200);
// 	});
// })

module.exports = {
	/**
	 *根据code从后台获取token
	 * @param code
	 * @param callback
	 */
	getUserInfo: function (code, callback) {
		var options = {
			host: config.logic.Host,
			port: config.logic.Port,
			path: api.createOrUpdateUser,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		client.getUserByCode(code, function (err, result) {
			if(err === null || err === '' || err === undefined) {
				var userInfo = result,
					postData = {
						openId: userInfo.openid,
						headImgUrl: userInfo.headimgurl,
						nickName: userInfo.nickname,
						sex: userInfo.sex,
						unionId: userInfo.unionid || '',
						weixinApp: 'OFFICIAL_ACCOUNT'
					};
				var req = http.request(options, function (res) {
					res.on('data', function (chunk) {
						var data = JSON.parse(chunk);
						if (res.statusCode >= 200 && res.statusCode < 300) {
							callback(null, data.token)
						}
						else {
							callback(data.error_message, data)
						}
					});
				});

				req.on('error', function (e) {
					callback(e)
				});

				req.write(JSON.stringify(postData));
				req.end();
			}
			else {
				callback(err)
			}
		});
	},
	
	
	/**
	 *用code获取token
	 * @param code
	 * @param callback
	 */
	codeForToken: function (code, callback) {
		var _self = this;
		if(code){
			_self.getUserInfo(code, function (err, data) {
				callback(err, data)
			})
		}
		else{
			callback('NoCode')
		}
	},
	/**
	 *
	 * @param unionId
	 * @param callback
	 */
	userHasBindOrNot: function (unionId, callback) {
		this.getUserInfo(unionId, function (err, result) {
			callback(err, result.user.password ? true : false)
		})
	},

	getAuthorizeURL: function (redirect, state, scope) {
		return client.getAuthorizeURL(redirect, state, scope)
	},

	getJSConfig: function (param, callback) {
		wechatAPI.getJsConfig(param, function (err, result) {
			callback(err, result)
		});
	},

	getMedia: function (serverId, callback) {
		wechatAPI.getMedia(serverId, function (err, result, res) {
			callback(err, result, res)
		});
	},

	checkAuth: function (auth, callback) {
		if(!auth){
			callback({error:'auth不能为空'},'')
			return false
		}
		var options = {
			host: config.logic.Host,
			port: config.logic.Port,
			path: config.API.checkAuth,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':auth
			}
		};
		var req = http.request(options, function(res) {
			res.on('data',function (chunk) {
				var data = JSON.parse(chunk);
				if (res.statusCode >=200 && res.statusCode <300){
					callback(null, data)
				}
				else{
					callback({error:'auth失效'}, data)
				}
			});
		});

		req.on('error', function(e) {
			callback(e)
		});
		req.end();
	}
}