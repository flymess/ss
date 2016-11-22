/**
 * Created by Alex on 16/5/20.
 */

var express = require('express')
    , path = require('path')
    , ejs = require('ejs')
    , app = express()
    ,request = require('request')
    , server = require('http').Server(app)
    ,io = require('socket.io')(server)
    ,Q=require('q')
    ,http=require('http')
    ,favicon = require('serve-favicon')
    ,url=require('url')
    ,querystring=require('querystring')
    ,config=require('./config.js')
    ,routes=require('./router/index')
    ,proxy = require('./router/proxy')
		,weixin = require('./router/weixin')
	  ,cookieParser = require('cookie-parser')
	  ,bodyParser = require('body-parser')
		morgan = require('morgan'),
		logDirectory = path.join(__dirname, 'logs'),
		fs = require('fs'),
		FileStreamRotator = require('file-stream-rotator');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
	date_format: 'YYYYMMDD',
	filename: path.join(logDirectory, 'access-%DATE%.log'),
	frequency: 'daily',
	verbose: false
})

var errorLogStream = FileStreamRotator.getStream({
	date_format: 'YYYYMMDD',
	filename: path.join(logDirectory, 'error-%DATE%.log'),
	frequency: 'daily',
	verbose: false
})

var roomInfo = {};
app.use(morgan('combined', {stream: accessLogStream}))
app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + ''));
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html;;
app.use(express.static(path.join(__dirname, '../src/assets')));
app.use(express.query());


app.use('/',weixin);

app.use('/',routes);

app.use('/',proxy);

//聊天室
io.on('connection', function (socket) {
    var id='';
    var user = {};
    socket.on('join',function(data){
        id=data.id;
        user = data.user;
        if (!roomInfo[id]) {
            roomInfo[id] = [];
        }
        roomInfo[id].push(data.user)
        socket.join(id);
        socket.emit('user list',roomInfo[id]);
        socket.broadcast.to(id).emit('user add',user);
    });


    socket.on('new message', function (data) {
        socket.broadcast.to(id).emit('server message',data);
    });

    socket.on('disconnect',function(){
        if (!roomInfo[id])return;
        var index=roomInfo[id].indexOf(user);
        if (index !== -1){
            roomInfo[id].splice(index, 1);
        }
        socket.broadcast.to(id).emit('user remove',user);
        socket.leave(id);
    })
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.use(function (err, req, res, next) {
	var meta = '[' + new Date() + '] ' + req.url + '\n';
	errorLogStream.write(meta + err.stack + '\n');
	next();
});
