var x = 100;
async function myfunc(param) {
    return new Promise((resolve, reject) => {
        // 模擬
        setTimeout(() => {
            param += 200;
            resolve(param);
        }, 1000);
    })
}
async function myfunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve('myfunc2');
    }, 1000);
    });
}
async function test() {
    await myfunc2();
    console.log('the one step');
    let result = await myfunc(x);
    console.log(result);// 两秒之后会被打印出来
}
test();

for(var i =0;i<10;i++)
{
    console.log("this is the test number :",i);
}

// //使用 setTimeout 来模拟异步请求
// function sleep(second, param) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(param);
//         }, second);
//     })
// }

// async function test2() {
//     let result1 = await sleep(2000, 'req01');
//     let result2 = await sleep(1000, 'req02' + result1);
//     let result3 = await sleep(500, 'req03' + result2);
//     console.log(result3,result2,result1);
// }

// test2();