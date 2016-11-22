/**
 * Created by Alex on 16/6/14.
 */
var express = require('express'),
    router = express.Router(),
    proxy = require('../proxy/proxyServer'),
    config = require('../config'),
	  request = require('request');

router.get('/api/*',function (req,res) {
    delete req.headers.host;
    proxy.web(req,res,{ target:config.proxy.Host});
});

router.post('/api/*',function (req,res) {
    delete req.headers.host;
    var headers = {}
    if (req.body){
        var data = JSON.stringify(req.body);
        req.body = data
        headers = {
            'Content-type': 'application/json',
            'Content-Length':Buffer.byteLength(data,'utf8')
        }
    }
    proxy.web(req,res,{ target:config.proxy.Host,headers:headers});
});


module.exports = router;
