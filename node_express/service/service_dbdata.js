
require('seneca')()

.use('../func/db_data')

// listen for role:math messages
// IMPORTANT: must match client
.listen({ type: 'tcp', pin: 'role:db_data' })
//.listen({ type: 'tcp',port:9003, pin: 'role:user' })