var si = require('systeminformation');

var hashmap = require('hashmap')
class cpu_class{
    constructor() {
        this.cpumap = new hashmap();
        si.currentLoad()
            .then(data => {
                
                data.cpus.map((cpu, i) => {
                    var x = Array(61).fill(0);
                    this.cpumap.set("CPU" + i+1, x);
                    //console.log(cpu.load);
                })
            })
            .catch(error => console.error(error))
    }
    say(callback) {
        si.currentLoad()
            .then(data => {
                if (callback != null)
                    callback(data.currentload);
                //console.log(data.currentload);
                //console.log(data.avgload, data.currentload_system);
                data.cpus.map((cpu, i) => {
                    let name = "CPU" + i + 1;
                    let objArray = this.cpumap.get(name);
                    objArray.shift();
                    objArray.push(cpu.load);
                    //if(i == 0)
                    //    console.log(objArray);
                })
            })
            .catch(error => console.error(error))

    }
}

module.exports = new cpu_class();



//Ç®²¨ unit test
//var cpu = new cpu_class();
//cpu.say();
//setInterval(() => {
//    cpu.say();
//}, 1000);



//si.cpu()
//    .then(data => {
//        console.log('CPU Information:');
//        console.log('- manufucturer: ' + data.manufacturer);
//        console.log('- brand: ' + data.brand);
//        console.log('- speed: ' + data.speed);
//        console.log('- cores: ' + data.cores);
//        console.log('- physical cores: ' + data.physicalCores);
//        console.log('...');
//    })
//    .catch(error => console.error(error));
