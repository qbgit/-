function CacheLRU(capacity) {
    /*  利用Buffer写的一个LRU缓存，capacity为缓存容量，为0时不限容量。
myCache = new CacheLRU(capacity); //构造缓存
myCache.get(key); //读取名为key的缓存值
myCache.put(key, value); //写入名为key的缓存值
myCache.remove(key); //删除名为key的缓存值
myCache.removeAll(); //清空缓存
myCache.info(); //返回myCache缓存信息
LRU原理：对所有缓存数据的key构建hash链表，当对某一数据进行get或put操作时，将其key提到链表前端（最新）。当进行put数据超出容量时，删除链表尾端（最旧）的缓存数据。
hash链表操作可直接定位key，无需历遍整个hash对象，故读写极快。缓存容量不再影响读写速度。
*/
    this.capacity = capacity || Number.MAX_VALUE;
    this.data = {};
    this.hash = {};
    this.linkedList = {
        length: 0,
        head: null,
        end: null
    }
    if (capacity <= 0) this.capacity = Number.MAX_VALUE;
};
CacheLRU.prototype.get = function(key) {
    key = '_' + key;
    var lruEntry = this.hash[key];
    if (!lruEntry) return;
    refresh(this.linkedList, lruEntry);
    return JSON.parse(this.data[key].toString());
};
CacheLRU.prototype.put = function(key, value) {
    if (value === undefined) return this;
    key = '_' + key;
    var lruEntry = this.hash[key];
    if (!lruEntry) {
        this.hash[key] = {key: key};
        this.linkedList.length += 1;
        lruEntry = this.hash[key];
    }
    refresh(this.linkedList, lruEntry);
    this.data[key] = new Buffer(JSON.stringify(value));
    if (this.linkedList.length > this.capacity) this.remove(this.linkedList.end.key.slice(1));
    return this;
};
CacheLRU.prototype.remove = function(key) {
    key = '_' + key;
    var lruEntry = this.hash[key];
    if (!lruEntry) return this;
    if (lruEntry === this.linkedList.head) this.linkedList.head = lruEntry.p;
    if (lruEntry === this.linkedList.end) this.linkedList.end = lruEntry.n;
    link(lruEntry.n, lruEntry.p);
    delete this.hash[key];
    delete this.data[key];
    this.linkedList.length -= 1;
    return this;
};
CacheLRU.prototype.removeAll = function() {
    this.data = {};
    this.hash = {};
    this.linkedList = {
        length: 0,
        head: null,
        end: null
    }
    return this;
};
CacheLRU.prototype.info = function() {
    var size = 0,
        data = this.linkedList.head;
    while (data){
        size += this.data[data.key].length;
        data = data.p;
    }
    return {
        capacity: this.capacity,
        length: this.linkedList.length,
        size: size
    };
};

// 更新链表，把get或put方法操作的key提到链表head，即表示最新
function refresh(linkedList, entry) {
    if (entry != linkedList.head) {
        if (!linkedList.end) {
            linkedList.end = entry;
        } else if (linkedList.end == entry) {
            linkedList.end = entry.n;
        }

        link(entry.n, entry.p);
        link(entry, linkedList.head);
        linkedList.head = entry;
        linkedList.head.n = null;
    }
}

// 对两个链表对象建立链接，形成一条链
function link(nextEntry, prevEntry) {
    if (nextEntry != prevEntry) {
        if (nextEntry) nextEntry.p = prevEntry;
        if (prevEntry) prevEntry.n = nextEntry;
    }
}

module.exports = CacheLRU;

// test:
/*var user = new CacheLRU(5);
user.put('user1', {name:'admin', age: 30});
user.put('user2', {name:'user', age: 31});
user.put('user3', {name:'guest', age: 32});
user.put('user4', {name:'guest', age: 34});
user.put('user5', {name:'guest', age: 35});
console.log(user.get('user1'));
console.log(user.get('user2'));
console.log(user.get('user3'));
user.put('user6', {name:'guest', age: 36});
console.log(user.info());*/


//   LRU算法也可以用于一些实际的应用中，如你要做一个浏览器，或类似于淘宝客户端的应用的就要用到这个原理。
//   大家都知道浏览器在浏览网页的时候会把下载的图片临时保存在本机的一个文件夹里，下次再访问时就会，直接
//   从本机临时文件夹里读取。但保存图片的临时文件夹是有一定容量限制的，如果你浏览的网页太多，就会一些你
//   最不常使用的图像删除掉，只保留最近最久使用的一些图片。这时就可以用到LRU算法 了，这时上面算法里的这
//   个特殊的栈就不是保存页面的序号了，而是每个图片的序号或大小；  所以上面这个栈的元素都用Object类来表
//   示，这样的话这个栈就可以保存的对像了。
//去除内存限制
//node --max-nex-space-size=1024 app.js // 单位为KB
//node --max-old-space-size=2000 app.js // 单位为MB


// let LimitableMap=function (limit) {
//     this.limit=limit || 10;
//     this.map={};
//     this.keys=[];
// };

// let hasOwnProperty=Object.prototype.hasOwnProperty;
// LimitableMap.prototype.set=function (key,value) {
//     let map=this.map;
//     let keys=this.keys;
//     if (!hasOwnProperty.call(map,key)) {
//         if (keys.length===this.limit) {
//             let firstKey=keys.shift();
//             delete map[firstKey];
//         }
//         keys.push(key);
//     }
//     map[key]=value;
// };

// LimitableMap.prototype.get=function (key) {
//     return this.map[key];
// };

// module.exports=LimitableMap;
