/**
 * Created by Alex on 16/7/28.
 */

var assert = require("assert"),
	weixinService = require('../service/weixinService'),
	expect = require('chai').expect;

describe('weixin', function(){
	describe('getUserInfo', function(){
		it('openId有效,返回token', function(done){
			weixinService.getUserInfo('or3znwHl6SKXNieblFRsD4QlgB0I').then(function (info) {
				try{
					expect(info).to.be.an('object')
					done()
				}catch(e){
					done(err)
				}
			})
		})
		it('openId无效,返回error',function (done) {
			weixinService. getUserInfo('111').catch(function (err) {
				try{
					expect(err.code).to.be.equal(40003);
					done()
				}catch (e){
					done(e)
				}

			})
		})
	}),

		describe('getToken', function () {
			it('code无效,返回错误', function(done){
				weixinService.codeForToken('Array').catch(function (err) {
					try{
						expect(err.code).to.be.equal(40029);
						done()
					}catch (e){
						done(e)
					}

				})
			})

			it('code有效,返回token',function (done) {
				weixinService.codeForToken('Array').catch(function (err) {
					try{
						expect(err.code).to.be.equal(40029);
						done()
					}catch (e){
						done(e)
					}
				})
			})
		}),

		describe('userHasBindOrNot',function () {
			it('openId有效, 且用户未绑定,返回false', function(done){
				weixinService.userHasBindOrNot('or3znwCljqd60cYcyNUEjkOrTydk').then(function (state) {
					try{
						expect(state).to.be.equal(false)
						done()
					}
					catch (e){
						done(e)
					}
				})
			})

			it('openId有效, 且用户已绑定,返回true', function(done){
				weixinService.userHasBindOrNot('or3znwHl6SKXNieblFRsD4QlgB0I').then(function (state) {
					try{
						expect(state).to.be.equal(true)
						done()
					}
					catch (e){
						done(e)
					}
				})
			})
		})
});