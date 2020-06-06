var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()


var senecaWebConfig = {
    //routes: Routes,
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
}

var app = Express()
      .use( require('body-parser').json() )
      .use( context )
      


var seneca = require('seneca')()
      .use(SenecaWeb, senecaWebConfig )
      .use('../func/local.js')
      //使用tcp方式进行微服务获取
      //启动institute服务和user服务 node /service/service_dbdata.js
      .client({ type:'tcp', pin:'role:db_data' } )
      //.client({ type:'tcp',port:9003, pin:'role:other'})


app.get('/', function (req, res) {
    res.send('Hello World')
})

//以下两个接口在本地
app.get('/test1',function(req,res){
    seneca.act({role: 'test', cmd: 'test1', tablename: "qq1" }, function (err, result) {
        if (err) return console.error(err)
        res.send(result);
      })
});
app.get('/test2',function(req,res){
      seneca.act({role: 'test', cmd: 'test2', tablename: "qq2" }, function (err, result) {
          if (err) return console.error(err)
          res.send(result);
        })
});

//以下两个接口在tcp上
  
//删除user，在服务里面 node /service/service_user.js,端口 9003
app.get('/userdel/:id',function(req,res){
      seneca.act({ role: 'db_data', cmd: 'del', id: "1" }, function (err, result) {
            if (err) return console.error(err)
            res.send(result);
      })
  });
  

//得到所有机构信息，暂时不分页 在服务里面 启动 node /service/service_institute.js 端口默认
//连接数据库 localhost db:test tablename:institute
app.get('/institute',function(req,res){
      seneca.act({ role: 'db_data', cmd: 'institute_get', id: 1 }, function (err, result) {
            if (err) return console.error(err)
            res.send(result);
      })
});
app.listen(3000)