const wait1 = () => {
    return new Promise(resolve => {
          setTimeout(() => { 
              resolve()
              console.log("1s later")
            }, 1000)
    })
    }
    
    const  wait2 = () => {
        return new Promise((resolve) => {
            resolve(setTimeout(()=>{console.log("500ms later")},500))
        })
    }
    async function test() {
        const a = await wait1()
        const b = await wait2()
        console.log("end")
    }
    console.log("start")
    test()