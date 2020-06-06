
## 语言融合微服务框架 听雨堂

### 1 nodejs think 方式
   
   mvc方式去掉了view，因为前端和后端分离

### 2 nodejs 以前的express 框架 和tcp通信微服务方式
   
   express依然是很成熟的框架

### 3 c++ 服务器 udp方式调用，目前只是简单网内udp， 会使用rtp方式和quic方式
   
   c++ 除了通信，也可以直接插件方式写入

### 4 go 服务方式 http，nodejs 在service中调用go服务，后面会增加 quic方式调用

   go 语言是比较好做http 和 其它媒体服务方式，以后重点会增加该项通信，使用udp，前向纠错FCC方式

### 5 java netty服务，目前是通过java 接收传感器数据，再通过redis 订阅发布方式来和nodejs 沟通

   java启动服务器，通过tcpClient_8051.js发模拟数据，模拟设备发送，启动node 来从redis接收订阅数据， 另外java 调用js
   
   在qbgit里面有例子

### 6 前端除了websocket，其它准备使用webrtc的udp方式和后台进行通信。

### 7 客户端将会用flutter，目前没有放上去。


