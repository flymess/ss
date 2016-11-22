var express = require('express'),
	router = express.Router(),
	config = require('../config'),
	path = require('path'),
	request = require('request'),
	weixinService = require('../service/weixinService');

/**
 * 1。当用户第一次进入时，且无code,跳转微信授权页面。
 * 2。当浏览器保存有cookie且没有过期，则直接进入页面，无需跳转授权页面
 * 3。当用户进入时，带有无效code，提示code错误，重新加载
 * 4。当用户进入时，呆有有效code,获取信息
 * 5。当带有有效role时，给用户设置角色，无有效role则，进入页面再选择
 */
router.get('/$',function(req,res){
	var code = req.query.code || '',
			state = req.query.state || '',
			role = req.query.roleid || '';
	weixinService.checkAuth(req.cookies.Authorization, function (err) {
		if (err === '' || err === undefined || err === null) {
			if (state)task(state, req.cookies.Authorization)
			setRole(role, req.cookies.Authorization, function () {
				res.sendFile(path.join(__dirname, '../../index.html'))
			})
			return false
		}
		weixinService.codeForToken(code, function (err, token) {
			if (state)task(state, token)
			if (err === null || err === undefined || err === '') {
				setRole(role, token, function () {
					res.cookie('Authorization', token)
					res.sendFile(path.join(__dirname, '../../index.html'))
				})
			}
			else if (err === 'NoCode') {
				// res.redirect(weixinService.getAuthorizeURL(config.domain,'', 'snsapi_userinfo'))
				res.sendFile(path.join(__dirname, '../../index.html'))
			}
			else {
				res.setHeader('content-type', 'text/html; charset=UTF-8');
				res.writeHead(403)
				res.end('服务器错误,请重新登陆')
			}
		})
	})
});

function task(id,token) {
	var options = {
		url: config.proxy.Host+'/api/tasks/'+id,
		headers: {
			'Authorization': token
		}
	};
	request(options,function (error,response,body) {
		console.log(body)
	});
}

function setRole(role,token, callback) {
	if(role == 200 || role == 300 || role == 400 || role==100){
		var options = {
			url: config.proxy.Host+'/api/update-roleid/?role_id='+role,
			headers: {
				'Authorization': token
			}
		};
		request(options,function (error,response,body) {
			callback(error, body)
		});
	}
	else{
		callback(null)
	}

}



router.get('/home',function(req,res){
	res.sendFile(path.resolve('test.html'))
});


module.exports = router;