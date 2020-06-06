
module.exports = 
{
    amqp: {
        type: 'rabbitmq',
        address: 'amqp://admin:admin@localhost:5672'
      },
    
      cache: {
        type: 'reddis',
        address: 'localhost'
      },
       register:
       {
         use_redis: 0
       },
      db: {
        type: 'mongodb',
        version: 'v3.4.9',
        address: 'mongodb://admin:admin@localhost:5672',
        FatalIfNotConnected: true
      },
      mysql:{
        address:'localhost',
        user:'admin',
        password:'admin',
        database:'mydb'
      },
      pm2: {
        app: {
          args: '',
          max_memory_restart: '150M',

          env: {
            NODE_ENV: 'development'
          },

          env_test: {
            NODE_ENV: 'test'
          },

          env_production: {
            NODE_ENV: 'production'
          },

          source_map_support: true,

          merge_logs: false,

          listen_timeout: 5000,
       
          kill_timeout: 2000,

          autorestart: false,

          force: false,

          post_update: ['npm install'],

          watch: false,
          // 忽略监听文件变化
          ignore_watch: ['node_modules']
        },
        logger: {
            winston: {
              level: 'info',
              label: 'microservices',
              format: info => {
                return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
              }
            }
          },
    }
}