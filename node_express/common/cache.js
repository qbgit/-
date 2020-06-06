let LimitableMap=function (limit) {
    this.limit=limit || 10;
    this.map={};
    this.keys=[];
};

let hasOwnProperty=Object.prototype.hasOwnProperty;
LimitableMap.prototype.set=function (key,value) {
    let map=this.map;
    let keys=this.keys;
    if (!hasOwnProperty.call(map,key)) {
        if (keys.length===this.limit) {
            let firstKey=keys.shift();
            delete map[firstKey];
        }
        keys.push(key);
    }
    map[key]=value;
};

LimitableMap.prototype.get=function (key) {
    return this.map[key];
};

module.exports=LimitableMap;
