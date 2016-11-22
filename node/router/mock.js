/**
 * Created by Alex on 16/6/14.
 */


var express = require('express'),
    router = express.Router()

var Mock = require('mockjs')


router.get('/test/api/activity/2/list',function (req,res) {
	 return res.json(Mock.mock({
			 'list': {
				 'title': '@title',
				 'img|1': [
					 "http://ww3.sinaimg.cn/large/006fVPCvjw1f4usy7bhtsj3096064t8y.jpg",
					 "http://ww3.sinaimg.cn/large/006fVPCvjw1f4usy7bhtsj3096064t8y.jpg",
					 "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4037780041,4066468437&fm=116&gp=0.jpg"
				 ],
				 'desc': '@cparagraph'
			 }
		 })
	 )

});

router.get('/test/api/activity/formerActivity',function (req,res) {
	return res.json(Mock.mock({
		"data|5": [
			{
				'activity': {
					'end_date': '@date',
					'title': '@title',
					'type|1': [1,2]
				},
				'videos|3': [
					{
						'item_id|1': [1,2,3],
						'item_type|1': [1,2,3],
						'video_desc': '@cparagraph',
						'img|1': [
							"http://ww3.sinaimg.cn/large/006fVPCvjw1f4usy7bhtsj3096064t8y.jpg",
							"http://ww3.sinaimg.cn/large/006fVPCvjw1f4usy7bhtsj3096064t8y.jpg",
							"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4037780041,4066468437&fm=116&gp=0.jpg"
						]
					}
				]
			}
		]
	}))
})

router.get('/test/api/subject/1/List',function (req,res) {
	return res.json(Mock.mock({
		"data|3":[
			{
				'title|1': ['第一单元','第二单元','第三单元'],
				'list': [
					{
						'value': '第一课时《xxxxxxx》',
						'id': 1
					},
					{
						'value': '第二课时《xxxxxxx》',
						'id': 2
					},
					{
						'value': '第三课时《xxxxxxxx》',
						'id': 3
					}
					]
			}
		]
	}))
})

router.get('/api/activity/:id/list',function (req,res) {

});

router.get('/test/api/subject/1/classHour',function (req,res) {
	return res.json(Mock.mock({
		"data|5": [
			{
				'courseware': [],
				'video': [
					{
						'title': ['课文解析','古诗词段落鉴赏','第一课沁园春雪'],
						'desc': 'xxxxxxxxxxxxxxxxxxxxxxxx',
						'img': 'http://ww4.sinaimg.cn/large/006fVPCvjw1f4xz1nqznbj309606474j.jpg'
					}
				]
			}
		]
	}))
})

router.get('/test/api/Theme/1/List',function (req,res) {
	return res.json(Mock.mock({
		"data|5": [
			{
				'title|1': ['高效课堂','教育信息化','高效备考','高效训练','高效学习','学校管理','教师专业发展','新高考改革'],
				'desc': 'xxxxxxxxxx',
				'id': 1,
				'img|1': [
					"http://ww3.sinaimg.cn/large/006fVPCvjw1f4usy7bhtsj3096064t8y.jpg",
					"http://ww3.sinaimg.cn/large/006fVPCvjw1f4usy7bhtsj3096064t8y.jpg",
					"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4037780041,4066468437&fm=116&gp=0.jpg"
				]
			}
		]
	}))
})

router.get('/test/api/video/topic/video/list/1',function (req,res) {
	return res.json(Mock.mock({
		"list|5": [
			{
				'res_id|+1': 1,
				'cover_img': 'http://i3.letvimg.com/lc12_yunzhuanma/201605/07/14/28/460309ce24262d36a1706cfcb206dace_NTYxODY0OTk=/thumb/2.jpg',
				'title': '济南电吉他培训 七弦电吉他独奏【加州旅馆】济南郭昂吉他.flv'
			}
		]
	}))
})

router.get('/test/api/video/topic/video/1',function (req,res) {
	return res.json(Mock.mock({
			"title": "济南电吉他培训",
			"user_avatar": "http://wx.qlogo.cn/mmopen/VZE2bP55LdkWttGyXHexyqSZSWQRSVJL2icZRsEZCWKYe3Wiau9mRZURcHFhlageUsY066QicmmuFTsGxiaicQrBiaqoibAqJWYMwyc/0",
			"user_name": "____   Chin、",
			"video": {
				"video_id": "28513006",
				"video_unique": "5425c6cda8",
				"video_name": "济南电吉他培训 七弦电吉他独奏【加州旅馆】济南郭昂吉他.flv",
				"status": "10",
				"user_unique": "4rlgtwomlc"
			}
	}))
})
module.exports = router;