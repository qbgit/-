//加密库

//npm install --save crypto-js
//使用hash函数
const {SHA256} = require('crypto-js');
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);
//返回值：
// Message: I am user number 3
// Hash: 9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3
//利用哈希模拟数据的加密解密
const {SHA256} = require('crypto-js');
var data = {
  id: 4
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()  // 密码+data 并hash
}

//如果data和密码都是正确的，那么数据没有被修改过。否则数据被修改。
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
//jsonwebtoken进行数据的加密解密
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');   //加密
console.log(token);

var decoded = jwt.verify(token, '123abc'); //解密
console.log('decoded', decoded);
//返回值
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTU0MzM5NzgwMn0.TMQoQEsCuUptXkix0-vYCN5FGJnynj7tSSeMda33giA
//decoded { id: 10, iat: 1543397802 }
