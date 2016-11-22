/**
 * Created by Alex on 16/6/17.
 */
var wechat=require('wechat')
	 ,express = require('express')
	 ,config = require('../config')
	 ,router = express.Router()
	 ,weixinService = require('../service/weixinService')

router.use('/wechat/$', wechat(config, function (req, res, next) {
	var message = req.weixin;
}));

router.post('/wechat/jsconfig',function (req,res) {
	var data = req.body;
	var param = {
		debug: data.debug,
		jsApiList: data.jsApiList,
		url: req.headers.referer
	};
	weixinService.getJSConfig(param, function (err, result) {
		if(err === null || err === undefined || err === '' ){
			res.json(result)
		}
		else{
			console.log(err)
			res.json({'state': '10001','message':'参数错误'})
		}
	})

});

router.use('/wechat/getMedia', function (req, response) {
	var media_id = req.query.id || '';
	if(media_id){
		weixinServcie.getMedia(media_id, function (err, result,res) {
			if(err === null || err === undefined || err === '' ){
				var filename = getFileName(res.headers['content-disposition']);
				fs.writeFile(path.join(__dirname, '../media', filename), result, function (err) {
					if(!err){
						imageService.thumb(result, filename)
						response.json({'state':'10000', 'url': config.cdn + '/media/'+ filename})
					}
					else{
						response.json({'state':'11010', 'message': '文件保存失败'})
					}
				})
			}
			else{
				response.json({'state':'11011','message':'文件上传失败'})
			}
		});
	}
	else{
		response.json({'state':'11002', 'message': '缺少参数id'})
	}
})

function getFileName(str) {
	return str.split(';')[1].split('=')[1].replace(/"/g, '')
}

module.exports = router;
