node-gyp configure --msvs_version=2015
node-gyp build


// hello.js
const addon = require('./build/Release/addon');

console.log(addon.hello());