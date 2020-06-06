var express = require('express');
var app = express();
var http = require('http').Server(app);
var httpget = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');

//var rw = require('./config.js');

//在线
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,// don't save session if unmodified
    saveUninitialized: false,// don't create session until something stored
    cookie: {
        maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
    }
}));

/*
app.use(function (req, res, next) {
    if (!req.session.user) {
        if (req.url == "/login") {
            next();//如果请求的地址是登录则通过，进行下一个请求
        }
        else {
            res.redirect('/login');
        }
    } else if (req.session.user) {
        console.log("logind , next");
        next();
    }
});

app.post('/login', function (req, res) {
    var user = rw.GetUserPassword();
    if (req.body.username == user.username && req.body.password == user.password) {
        req.session.user = user;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
app.get('/logout', function (req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/login');
});
*/
app.use(express.static(__dirname));



 app.get("/",function(req,res){
     
     res.send("{ret:ok}");
 });

http.listen(8080, function () {
    console.log('listening on *:8080');
});

