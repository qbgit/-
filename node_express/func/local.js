module.exports = function api(options) {

    var cal_valid_ops = { sum:'sum', product:'product' }
    var user_valid_ops = {del:'del',update:'add'}
    this.add('role:api,path:cal', function (msg, respond) {
      var operation = msg.args.params.operation
      var left = msg.args.query.left
      var right = msg.args.query.right
      this.act('role:math', {
        cmd:   cal_valid_ops[operation],
        left:  left,
        right: right,
      }, respond)
    })
  
    this.add('role:api,path:user', function (msg, respond) {
        var operation = msg.args.params.operation
       
        this.act('role:user', {
          cmd:  operation,
          id:   msg.args.query.id
        }, respond)
      })
  
    

    this.add('init:api', function (msg, respond) {
      this.act('role:web',{routes:{
        prefix: '/api',
        pin:    'role:api,path:*',
        map: {
            cal: { GET: true, suffix: '/:operation' },
            user: { GET: true, suffix: '/:operation' },
        }
      }}, respond)
    })
  
    this.add('role:test,cmd:test1', function (msg, respond) {
      console.log(msg.tablename);
      respond(null, {success:'ok,test1'})
    });

    this.add('role:test,cmd:test2', function (msg, respond) {
      console.log(msg.tablename);
      respond(null, {success:'ok,test2'})
    });


  }
